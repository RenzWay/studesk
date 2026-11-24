package com.renz.studesk.data.auth

import com.google.firebase.FirebaseNetworkException
import com.google.firebase.FirebaseTooManyRequestsException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.FirebaseAuthInvalidUserException
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.auth.FirebaseAuthWeakPasswordException
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.auth.UserProfileChangeRequest
import com.renz.studesk.domain.auth.AuthError
import com.renz.studesk.domain.auth.AuthException
import com.renz.studesk.domain.auth.AuthRepository
import com.renz.studesk.domain.auth.AuthUser
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.merge
import kotlinx.coroutines.tasks.await
import kotlin.coroutines.cancellation.CancellationException

class FirebaseAuthRepository(private val auth: FirebaseAuth) : AuthRepository {
    private val profileUpdates = MutableSharedFlow<Unit>(extraBufferCapacity = 1)

    private val firebaseState: Flow<AuthUser?> = callbackFlow {
        val listener = FirebaseAuth.AuthStateListener { trySend(it.currentUser?.toDomain()) }
        auth.addAuthStateListener(listener)
        awaitClose { auth.removeAuthStateListener(listener) }
    }

    override val authState: Flow<AuthUser?> =
        merge(
            firebaseState,
            profileUpdates.map { auth.currentUser?.toDomain() }
        ).distinctUntilChanged()

    override suspend fun signIn(email: String, password: String): Result<Unit> = authCall {
        auth.signInWithEmailAndPassword(email, password).await()
    }

    override suspend fun signInWithGoogle(idToken: String): Result<Unit> = authCall {
        auth.signInWithCredential(GoogleAuthProvider.getCredential(idToken, null)).await()
    }

    override suspend fun register(
        name: String,
        email: String,
        password: String
    ): Result<Unit> = authCall {
        val user = auth.createUserWithEmailAndPassword(email, password).await().user
        val profile = UserProfileChangeRequest.Builder().setDisplayName(name).build()
        user?.updateProfile(profile)?.await()
        profileUpdates.tryEmit(Unit)
    }

    override suspend fun sendPasswordReset(email: String): Result<Unit> = authCall {
        auth.sendPasswordResetEmail(email).await()
    }

    override fun signOut() {
        auth.signOut()
    }
}

private fun FirebaseUser.toDomain() = AuthUser(uid = uid, email = email, displayName = displayName)

private suspend inline fun authCall(block: () -> Unit): Result<Unit> =
    try {
        block()
        Result.success(Unit)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        Result.failure(AuthException(e.toAuthError(), e))
    }

private fun Throwable.toAuthError(): AuthError = when (this) {
    is FirebaseAuthWeakPasswordException -> AuthError.WeakPassword
    is FirebaseAuthUserCollisionException -> AuthError.EmailInUse
    is FirebaseAuthInvalidUserException ->
        if (errorCode == "ERROR_USER_DISABLED") AuthError.UserDisabled else AuthError.InvalidCredentials

    is FirebaseAuthInvalidCredentialsException ->
        if (errorCode == "ERROR_INVALID_EMAIL") AuthError.InvalidEmail else AuthError.InvalidCredentials

    is FirebaseTooManyRequestsException -> AuthError.TooManyRequests
    is FirebaseNetworkException -> AuthError.Network
    else -> AuthError.Unknown
}
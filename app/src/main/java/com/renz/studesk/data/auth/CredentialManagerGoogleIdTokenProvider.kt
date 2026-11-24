package com.renz.studesk.data.auth

import android.content.Context
import androidx.credentials.CredentialManager
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import androidx.credentials.exceptions.GetCredentialCancellationException
import androidx.credentials.exceptions.GetCredentialException
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import com.google.android.libraries.identity.googleid.GoogleIdTokenParsingException
import com.renz.studesk.domain.auth.AuthError
import com.renz.studesk.domain.auth.AuthException
import com.renz.studesk.domain.auth.GoogleIdTokenProvider
import com.renz.studesk.domain.auth.SignInCancelledException
import kotlin.coroutines.cancellation.CancellationException

class CredentialManagerGoogleIdTokenProvider(
    private val webClientId: String,
) : GoogleIdTokenProvider {

    override suspend fun getIdToken(context: Context): Result<String> = try {
        val option = GetSignInWithGoogleOption.Builder(webClientId).build()
        val request = GetCredentialRequest.Builder().addCredentialOption(option).build()
        val credential = CredentialManager.create(context)
            .getCredential(context, request)
            .credential

        if (credential is CustomCredential &&
            credential.type == GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL
        ) {
            Result.success(GoogleIdTokenCredential.createFrom(credential.data).idToken)
        } else {
            Result.failure(AuthException(AuthError.GoogleUnavailable))
        }
    } catch (e: CancellationException) {
        throw e
    } catch (e: GetCredentialCancellationException) {
        Result.failure(SignInCancelledException(e))
    } catch (e: GetCredentialException) {
        Result.failure(AuthException(AuthError.GoogleUnavailable, e))
    } catch (e: GoogleIdTokenParsingException) {
        Result.failure(AuthException(AuthError.Unknown, e))
    }
}
package com.renz.studesk.app

import android.content.Context
import com.google.firebase.auth.FirebaseAuth
import com.renz.studesk.R
import com.renz.studesk.data.auth.CredentialManagerGoogleIdTokenProvider
import com.renz.studesk.data.auth.FirebaseAuthRepository
import com.renz.studesk.domain.auth.AuthRepository
import com.renz.studesk.domain.auth.GoogleIdTokenProvider

class AppContainer(private val appContext: Context) {
    val authRepository: AuthRepository by lazy {
        FirebaseAuthRepository(FirebaseAuth.getInstance())
    }

    val googleIdTokenProvider: GoogleIdTokenProvider by lazy {
        CredentialManagerGoogleIdTokenProvider(appContext.getString(R.string.default_web_client_id))
    }
}
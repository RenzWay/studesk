package com.renz.studesk.domain.auth

import android.content.Context

interface GoogleIdTokenProvider {
    suspend fun getIdToken(context: Context): Result<String>
}
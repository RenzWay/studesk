package com.renz.studesk.ui.screen.auth

import androidx.annotation.StringRes
import com.renz.studesk.R
import com.renz.studesk.domain.auth.AuthError
import com.renz.studesk.ui.viewModel.LoginError

@StringRes
fun AuthError.toStringRes(): Int = when (this) {
    AuthError.InvalidCredentials -> R.string.auth_error_invalid_credentials
    AuthError.InvalidEmail -> R.string.auth_error_invalid_email
    AuthError.EmailInUse -> R.string.auth_error_email_in_use
    AuthError.WeakPassword -> R.string.auth_error_weak_password
    AuthError.UserDisabled -> R.string.auth_error_user_disabled
    AuthError.TooManyRequests -> R.string.auth_error_too_many_requests
    AuthError.Network -> R.string.auth_error_network
    AuthError.GoogleUnavailable -> R.string.auth_error_google_unavailable
    AuthError.Unknown -> R.string.auth_error_unknown
}

@StringRes
fun LoginError.toStringRes(): Int = when (this) {
    LoginError.EmptyFields -> R.string.login_error_empty
    is LoginError.Auth -> error.toStringRes()
}
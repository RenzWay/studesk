package com.renz.studesk.domain.auth

import androidx.annotation.StringRes
import com.renz.studesk.R
import com.renz.studesk.ui.screen.auth.toStringRes
import com.renz.studesk.ui.viewModel.RegisterError

enum class AuthError {
    InvalidCredentials,
    InvalidEmail,
    EmailInUse,
    WeakPassword,
    UserDisabled,
    TooManyRequests,
    Network,
    GoogleUnavailable,
    Unknown,
}

@StringRes
fun RegisterError.toStringRes(): Int = when (this) {
    RegisterError.EmptyFields -> R.string.register_error_empty
    RegisterError.PasswordTooShort -> R.string.register_error_password_short
    is RegisterError.Auth -> error.toStringRes()
}

class AuthException(val error: AuthError, cause: Throwable? = null) : Exception(cause)

class SignInCancelledException(cause: Throwable? = null) : Exception(cause)
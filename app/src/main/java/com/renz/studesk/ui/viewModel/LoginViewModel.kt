package com.renz.studesk.ui.viewModel

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.renz.studesk.app.AppContainer
import com.renz.studesk.domain.auth.AuthError
import com.renz.studesk.domain.auth.AuthException
import com.renz.studesk.domain.auth.AuthRepository
import com.renz.studesk.domain.auth.GoogleIdTokenProvider
import com.renz.studesk.domain.auth.SignInCancelledException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

sealed interface LoginError {
    data object EmptyFields : LoginError
    data class Auth(val error: AuthError) : LoginError
}

data class LoginUiState(
    val email: String = "",
    val password: String = "",
    val isLoading: Boolean = false,
    val isGoogleLoading: Boolean = false,
    val error: LoginError? = null,
) {
    val isBusy: Boolean get() = isLoading || isGoogleLoading
}

class LoginViewModel(
    private val authRepository: AuthRepository,
    private val googleIdTokenProvider: GoogleIdTokenProvider,
) : ViewModel() {
    private val _uiState = MutableStateFlow(LoginUiState())
    val uiState: StateFlow<LoginUiState> = _uiState.asStateFlow()

    fun onEmailChange(email: String) {
        _uiState.update { it.copy(email = email, error = null) }
    }

    fun onPasswordChange(password: String) {
        _uiState.update { it.copy(password = password, error = null) }
    }

    fun signIn() {
        val state = _uiState.value
        if (state.isBusy) return
        if (state.email.isBlank() || state.password.isEmpty()) {
            _uiState.update { it.copy(error = LoginError.EmptyFields) }
            return
        }

        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            finishSignIn(authRepository.signIn(state.email.trim(), state.password))
        }
    }

    fun signInWithGoogle(context: Context) {
        if (_uiState.value.isBusy) return

        viewModelScope.launch {
            _uiState.update { it.copy(isGoogleLoading = true, error = null) }
            val result = googleIdTokenProvider.getIdToken(context).fold(
                onSuccess = { idToken -> authRepository.signInWithGoogle(idToken) },
                onFailure = { Result.failure<Unit>(it) },
            )
            finishSignIn(result)
        }
    }

    private fun finishSignIn(result: Result<Unit>) {
        result
            .onSuccess {
                _uiState.update { it.copy(isLoading = false, isGoogleLoading = false) }
            }
            .onFailure { e ->
                val error = if (e is SignInCancelledException) {
                    null
                } else {
                    LoginError.Auth((e as? AuthException)?.error ?: AuthError.Unknown)
                }
                _uiState.update {
                    it.copy(
                        isLoading = false,
                        isGoogleLoading = false,
                        error = error
                    )
                }
            }
    }

    companion object {
        fun factory(container: AppContainer) = viewModelFactory {
            initializer {
                LoginViewModel(
                    container.authRepository,
                    container.googleIdTokenProvider
                )
            }
        }
    }
}
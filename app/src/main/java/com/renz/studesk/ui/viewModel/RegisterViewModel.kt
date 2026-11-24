package com.renz.studesk.ui.viewModel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.renz.studesk.app.AppContainer
import com.renz.studesk.domain.auth.AuthError
import com.renz.studesk.domain.auth.AuthException
import com.renz.studesk.domain.auth.AuthRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

sealed interface RegisterError {
    data object EmptyFields : RegisterError
    data object PasswordTooShort : RegisterError
    data class Auth(val error: AuthError) : RegisterError
}

data class RegisterUiState(
    val name: String = "",
    val email: String = "",
    val password: String = "",
    val isLoading: Boolean = false,
    val error: RegisterError? = null,
)

class RegisterViewModel(private val authRepository: AuthRepository) : ViewModel() {
    private val _uiState = MutableStateFlow(RegisterUiState())
    val uiState: StateFlow<RegisterUiState> = _uiState.asStateFlow()

    fun onNameChange(name: String) {
        _uiState.update { it.copy(name = name, error = null) }
    }

    fun onEmailChange(email: String) {
        _uiState.update { it.copy(email = email, error = null) }
    }

    fun onPasswordChange(password: String) {
        _uiState.update { it.copy(password = password, error = null) }
    }

    fun register() {
        val state = _uiState.value
        if (state.isLoading) return
        if (state.name.isBlank() || state.email.isBlank() || state.password.isEmpty()) {
            _uiState.update { it.copy(error = RegisterError.EmptyFields) }
            return
        }
        if (state.password.length < MIN_PASSWORD_LENGTH) {
            _uiState.update { it.copy(error = RegisterError.PasswordTooShort) }
            return
        }

        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            authRepository.register(state.name.trim(), state.email.trim(), state.password)
                .onSuccess {
                    // Sukses: Firebase otomatis login -> authState berubah -> StudeskRoot pindah layar.
                    _uiState.update { it.copy(isLoading = false) }
                }
                .onFailure { e ->
                    val authError = (e as? AuthException)?.error ?: AuthError.Unknown
                    _uiState.update {
                        it.copy(
                            isLoading = false,
                            error = RegisterError.Auth(authError)
                        )
                    }
                }
        }
    }

    companion object {
        const val MIN_PASSWORD_LENGTH = 6 // batas minimum Firebase Auth

        fun factory(container: AppContainer) = viewModelFactory {
            initializer { RegisterViewModel(container.authRepository) }
        }
    }
}
package com.renz.studesk.ui.viewModel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.renz.studesk.app.AppContainer
import com.renz.studesk.domain.auth.AuthRepository
import com.renz.studesk.domain.auth.AuthUser
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

sealed interface SessionState {
    data object Loading : SessionState
    data object SignedOut : SessionState
    data class SignedIn(val user: AuthUser) : SessionState
}

class SessionViewModel(authRepository: AuthRepository) : ViewModel() {
    val state: StateFlow<SessionState> =
        authRepository.authState.map<AuthUser?, SessionState> { user ->
            if (user == null) SessionState.SignedOut else SessionState.SignedIn(user)
        }.stateIn(viewModelScope, SharingStarted.Eagerly, SessionState.Loading)

    companion object {
        fun factory(container: AppContainer) = viewModelFactory {
            initializer { SessionViewModel(container.authRepository) }
        }
    }
}
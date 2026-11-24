package com.renz.studesk.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.renz.studesk.app.AppContainer
import com.renz.studesk.ui.viewModel.SessionState
import com.renz.studesk.ui.viewModel.SessionViewModel

@Composable
fun StudeskRoot(appContainer: AppContainer, sessionViewModel: SessionViewModel) {
    val session by sessionViewModel.state.collectAsStateWithLifecycle()

    when (session) {
        SessionState.Loading -> Unit // splash masih menahan layar
        SessionState.SignedOut -> AuthNavGraph(appContainer)
        is SessionState.SignedIn -> MainNavGraph(appContainer)
    }
}
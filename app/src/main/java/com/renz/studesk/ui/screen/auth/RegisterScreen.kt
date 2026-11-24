package com.renz.studesk.ui.screen.auth

import android.content.res.Configuration
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.renz.studesk.R
import com.renz.studesk.app.AppContainer
import com.renz.studesk.domain.auth.toStringRes
import com.renz.studesk.ui.components.AuthPasswordField
import com.renz.studesk.ui.components.AuthScaffold
import com.renz.studesk.ui.components.AuthTextField
import com.renz.studesk.ui.components.FormError
import com.renz.studesk.ui.components.LoadingButton
import com.renz.studesk.ui.theme.StudeskTheme
import com.renz.studesk.ui.viewModel.RegisterUiState
import com.renz.studesk.ui.viewModel.RegisterViewModel

@Composable
fun RegisterScreen(
    appContainer: AppContainer,
    onNavigateToLogin: () -> Unit,
    viewModel: RegisterViewModel = viewModel(factory = RegisterViewModel.factory(appContainer))
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    RegisterContent(
        state = state,
        onNameChange = viewModel::onNameChange,
        onEmailChange = viewModel::onEmailChange,
        onPasswordChange = viewModel::onPasswordChange,
        onRegister = viewModel::register,
        onNavigateToLogin = onNavigateToLogin,
    )
}

@Composable
fun RegisterContent(
    state: RegisterUiState,
    onNameChange: (String) -> Unit,
    onEmailChange: (String) -> Unit,
    onPasswordChange: (String) -> Unit,
    onRegister: () -> Unit,
    onNavigateToLogin: () -> Unit,
    modifier: Modifier = Modifier,
) {
    AuthScaffold(
        title = stringResource(R.string.register_title),
        subtitle = stringResource(R.string.register_subtitle),
        modifier = modifier,
    ) {
        AuthTextField(
            value = state.name,
            onValueChange = onNameChange,
            label = stringResource(R.string.field_name),
            enabled = !state.isLoading,
            capitalization = KeyboardCapitalization.Words,
        )
        AuthTextField(
            value = state.email,
            onValueChange = onEmailChange,
            label = stringResource(R.string.field_email),
            enabled = !state.isLoading,
            keyboardType = KeyboardType.Email,
        )
        AuthPasswordField(
            value = state.password,
            onValueChange = onPasswordChange,
            label = stringResource(R.string.field_password),
            onDone = onRegister,
            enabled = !state.isLoading,
        )

        state.error?.let { FormError(it.toStringRes()) }

        LoadingButton(
            text = stringResource(R.string.register_button),
            onClick = onRegister,
            isLoading = state.isLoading,
        )

        Text(
            text = stringResource(R.string.register_google_hint),
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                text = stringResource(R.string.register_has_account),
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            TextButton(onClick = onNavigateToLogin, enabled = !state.isLoading) {
                Text(stringResource(R.string.register_login_link))
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun RegisterContentPreview() {
    StudeskTheme {
        RegisterContent(RegisterUiState(name = "Rendra"), {}, {}, {}, {}, {})
    }
}

@Preview(showBackground = true, uiMode = Configuration.UI_MODE_NIGHT_YES, name = "Dark")
@Composable
private fun RegisterContentDarkPreview() {
    StudeskTheme {
        RegisterContent(RegisterUiState(name = "Rendra"), {}, {}, {}, {}, {})
    }
}
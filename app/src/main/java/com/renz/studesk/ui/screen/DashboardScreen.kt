package com.renz.studesk.ui.screen


import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.renz.studesk.R
import com.renz.studesk.ui.theme.StudeskTheme

@Composable
fun DashboardScreen(onSignOut: () -> Unit, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .safeDrawingPadding(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text("Dashboard")
        Button(onClick = onSignOut) { Text(text= stringResource( R.string.sign_out)) }
    }
}

@Preview
@Composable
private fun DashboardScreenPreview() {
    StudeskTheme() {
        DashboardScreen(onSignOut = {})
    }
}
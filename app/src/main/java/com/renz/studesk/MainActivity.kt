package com.renz.studesk

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.renz.studesk.app.StudeskApp
import com.renz.studesk.navigation.StudeskRoot
import com.renz.studesk.ui.theme.StudeskTheme
import com.renz.studesk.ui.viewModel.SessionState
import com.renz.studesk.ui.viewModel.SessionViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        val splash = installSplashScreen()
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val container = (application as StudeskApp).container
        val sessionViewModel: SessionViewModel by viewModels { SessionViewModel.factory(container) }

        // Splash tetap tampil sampai status login pertama diketahui -> tidak ada kedip layar login.
        splash.setKeepOnScreenCondition { sessionViewModel.state.value is SessionState.Loading }

        setContent {
            StudeskTheme {
                StudeskRoot(container, sessionViewModel)
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    StudeskTheme {
        Greeting("Android")
    }
}
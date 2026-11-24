package com.renz.studesk.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.renz.studesk.app.AppContainer
import com.renz.studesk.ui.screen.auth.LoginScreen
import com.renz.studesk.ui.screen.auth.RegisterScreen

@Composable
fun AuthNavGraph(
    appContainer: AppContainer,
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Login.route
    ) {
        composable(Screen.Login.route) {
            LoginScreen(
                appContainer = appContainer,
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route)
                },
                onNavigateToForgotPassword = {
                    navController.navigate(Screen.ForgotPassword.route)
                }
            )
        }
        composable(Screen.Register.route) {
            RegisterScreen(
                appContainer = appContainer,
                onNavigateToLogin = { navController.popBackStack() })
        }
        composable(Screen.ForgotPassword.route) {
            // Placeholder for ForgotPasswordScreen
        }
    }
}
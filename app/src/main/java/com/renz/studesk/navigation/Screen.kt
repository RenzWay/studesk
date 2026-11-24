package com.renz.studesk.navigation

sealed class Screen(val route: String) {
    // Auth routes
    data object Login : Screen("login")
    data object Register : Screen("register")
    data object ForgotPassword : Screen("forgot_password")

    // Main app routes
    data object Dashboard : Screen("dashboard")
    data object Task : Screen("task")
    data object Schedule : Screen("schedule")
    data object Note : Screen("note")
}
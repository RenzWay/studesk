package com.renz.studesk.app

import android.app.Application

class StudeskApp : Application() {
    val container: AppContainer by lazy { AppContainer(this) }
}
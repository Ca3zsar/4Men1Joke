import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';;

import { JokefeedComponent } from './home/jokefeed/jokefeed.component';
import { JokeComponent } from './home/joke/joke.component';
import { FilterComponent } from './home/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidateTokenComponent } from './validate-token/validate-token.component';
import { CommentsDialogComponent } from './home/comments-dialog/comments-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    JokefeedComponent,
    JokeComponent,
    FilterComponent,
    ValidateTokenComponent,
    CommentsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

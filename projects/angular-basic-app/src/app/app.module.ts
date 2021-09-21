import { E2eTestModule } from '../components/e2e/e2etest/e2etest.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ConfigModule } from '@ce/config-lib';
import { environment } from '../environments';
import { AuthGuard, AuthModule, LogoutDialogModule } from '@ce/auth-lib';
import { E2eProtectedModule } from '../components/e2e/e2e-protected/e2e-protected.module';
import { DandaAngularModule } from '@ce/danda-angular-lib';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule.forRoot({ onLogoutRouteName: '', shouldSkipTenantSelect: false }), // Ensure AuthModule goes before any modules with a wildcard
    BrowserAnimationsModule,
    ConfigModule.forRoot(environment),
    E2eTestModule,
    E2eProtectedModule,
    LogoutDialogModule,
    DandaAngularModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard]
})
export class AppModule {}

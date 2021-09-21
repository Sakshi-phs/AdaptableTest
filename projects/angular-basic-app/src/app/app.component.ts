import { Component, Inject, OnInit } from '@angular/core';
import { AUTH_SERVICE_REF, AuthenticationService } from '@ce/auth-lib';
import { LogoutDialogService, AutoUnsubscribe } from '@ce/platform-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@AutoUnsubscribe
export class AppComponent implements OnInit {
  constructor(private logoutDialogService: LogoutDialogService, @Inject(AUTH_SERVICE_REF) private authSvc: AuthenticationService) {}

  authenticated = false;
  sub: Subscription;

  ngOnInit() {
    this.sub = this.authSvc.isLoggedIn().subscribe((authenticated) => {
      this.authenticated = authenticated;
    });
  }

  onLogoutClick() {
    this.logoutDialogService.openDialog();
  }
}

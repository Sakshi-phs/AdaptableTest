import { NgModule } from '@angular/core';
import { AuthGuard } from '@ce/auth-lib';
import { RouterModule, Routes } from '@angular/router';
import { E2eTestComponent } from '../components/e2e/e2etest/e2etest.component';
import { E2eProtectedComponent } from '../components/e2e/e2e-protected/e2e-protected.component';

const routes: Routes = [
  {
    path: '',
    component: E2eTestComponent
  },
  {
    path: 'protected',
    canActivate: [AuthGuard],
    component: E2eProtectedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

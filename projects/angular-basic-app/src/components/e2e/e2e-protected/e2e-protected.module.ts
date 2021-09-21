import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { E2eProtectedComponent } from './e2e-protected.component';
import { DandaAngularModule } from '@ce/danda-angular-lib';

@NgModule({
  declarations: [E2eProtectedComponent],
  imports: [RouterModule, DandaAngularModule],
  exports: [E2eProtectedComponent]
})
export class E2eProtectedModule {}

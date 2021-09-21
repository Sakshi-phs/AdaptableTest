import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { E2eTestComponent } from './e2etest.component';
import { DandaAngularModule } from '@ce/danda-angular-lib';
import { E2eDataGridModule } from '../e2edatagrid/e2edatagrid.module';

@NgModule({
  declarations: [E2eTestComponent],
  imports: [BrowserModule, BrowserAnimationsModule, DandaAngularModule, E2eDataGridModule],
  exports: [E2eTestComponent]
})
export class E2eTestModule {}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { InsightsDataGridModule } from '@ce/platform-lib';
import { E2eDataGridComponent } from './e2edatagrid.component';

@NgModule({
  declarations: [E2eDataGridComponent],
  imports: [BrowserModule, BrowserAnimationsModule, InsightsDataGridModule],
  exports: [E2eDataGridComponent]
})
export class E2eDataGridModule {}

import { ViewType } from '../e2edatagrid/e2edatagrid.component';
import { Component } from '@angular/core';
import { mockData } from '../mocks/e2edatagrid.mock-data';
import { timer } from 'rxjs';

@Component({
  selector: 'e2e-test',
  templateUrl: './e2etest.component.html',
  styleUrls: ['./e2etest.component.scss']
})
export class E2eTestComponent {
  libOptions = [
    { label: '@ce/config-lib', value: '@ce/config-lib' },
    { label: '@ce/auth-lib', value: '@ce/auth-lib' },
    { label: '@ce/platform-lib', value: '@ce/platform-lib' },
    { label: '@ce/danda-angular-lib', value: '@ce/danda-angular-lib' }
  ];

  onLibrarySelected(event: Event) {}

  gridData = [];

  isFetching = false;
  hasError = false;
  loadDataErrorMessage = '';
  emptyDataErrorMessage = 'No data';
  defaultView: ViewType = ViewType.LIST;

  onGenerateData() {
    this.isFetching = true;
    this.reset();
    timer(1500).subscribe(() => {
      this.gridData = E2eTestComponent.getData();
      this.isFetching = false;
    });
  }

  onGenerateError() {
    this.isFetching = true;
    this.reset();
    timer(1500).subscribe(() => {
      this.hasError = true;
      this.loadDataErrorMessage = 'Bwah bwah. Error getting data!';
      this.isFetching = false;
    });
  }

  onGenerateNoData() {
    this.isFetching = true;
    this.reset();
    timer(1500).subscribe(() => {
      this.emptyDataErrorMessage = 'No data';
      this.isFetching = false;
    });
  }

  reset() {
    this.gridData = [];
    this.hasError = false;
    this.loadDataErrorMessage = '';
    this.emptyDataErrorMessage = '';
  }
  static getData() {
    return mockData.map((m) => m);
  }
}

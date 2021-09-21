import { Component, Input } from '@angular/core';
import { mockData } from '../mocks/e2edatagrid.mock-data';

export enum ViewType {
  LIST = 'LIST',
  GRID = 'GRID'
}

@Component({
  selector: 'e2e-data-grid',
  templateUrl: './e2edatagrid.component.html',
  styleUrls: ['./e2edatagrid.component.scss']
})
export class E2eDataGridComponent {
  @Input() loadDataErrorMessage;
  @Input() emptyDataErrorMessage;
  @Input() hasError: boolean;
  @Input() isFetching: boolean;
  @Input() data: any[] = [];
  @Input() defaultView: ViewType;

  count = 1;
  fetchMoreData() {
    this.isFetching = true;
    setTimeout(() => {
      mockData.forEach(({ name, description, tags }) => {
        this.data.push({ name: `${this.count} - ${name}`, description, tags });
      });
      this.count++;
      this.isFetching = false;
    }, 2000);
  }
}

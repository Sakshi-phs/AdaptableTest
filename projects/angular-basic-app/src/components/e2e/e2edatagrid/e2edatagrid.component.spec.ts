import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { E2eDataGridComponent } from './e2edatagrid.component';
import { E2eDataGridModule } from './e2edatagrid.module';

describe('E2eDataGridComponent', () => {
  let component: E2eDataGridComponent;
  let fixture: ComponentFixture<E2eDataGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [E2eDataGridModule]
    });
    fixture = TestBed.createComponent(E2eDataGridComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loadDataErrorMessage).toBeFalsy();
    expect(component.emptyDataErrorMessage).toBeFalsy();
    expect(component.hasError).toBeFalsy();
    expect(component.isFetching).toBeFalsy();
    expect(component.data).toEqual([]);
    expect(component.defaultView).toBeFalsy();
  });

  it('should fetch data', fakeAsync(() => {
    component.fetchMoreData();
    expect(component.isFetching).toBeTrue();
    tick(2000);
    expect(component.isFetching).toBeFalse();
    expect(component.data.length).toBeGreaterThan(0);
  }));
});

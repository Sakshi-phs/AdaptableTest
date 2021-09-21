import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { E2eTestModule } from './e2etest.module';
import { E2eTestComponent } from './e2etest.component';
import { ViewType } from '../e2edatagrid/e2edatagrid.component';
import { mockData } from '../mocks/e2edatagrid.mock-data';
import { RouterTestingModule } from '@angular/router/testing';

describe('E2eTestComponent', () => {
  let component: E2eTestComponent;
  let fixture: ComponentFixture<E2eTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [E2eTestModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(E2eTestComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.libOptions.length).toEqual(4);
    expect(component.gridData).toEqual([]);
    expect(component.hasError).toBeFalse();
    expect(component.isFetching).toBeFalse();
    expect(component.loadDataErrorMessage).toEqual('');
    expect(component.emptyDataErrorMessage).toEqual('No data');
    expect(component.defaultView).toEqual(ViewType.LIST);
  });

  it('should generate data', fakeAsync(() => {
    spyOn(component, 'reset');
    component.onGenerateData();
    expect(component.isFetching).toBeTrue();
    expect(component.reset).toHaveBeenCalled();
    tick(1500);
    expect(component.gridData.length).toBeGreaterThan(0);
    expect(component.isFetching).toBeFalse();
  }));

  it('should generate error', fakeAsync(() => {
    spyOn(component, 'reset');
    component.onGenerateError();
    expect(component.hasError).toBeFalse();
    expect(component.isFetching).toBeTrue();
    expect(component.reset).toHaveBeenCalled();
    tick(1500);
    expect(component.hasError).toBeTrue();
    expect(component.loadDataErrorMessage).toEqual('Bwah bwah. Error getting data!');
    expect(component.isFetching).toBeFalse();
  }));

  it('should generate no data', fakeAsync(() => {
    spyOn(component, 'reset');
    component.onGenerateNoData();
    expect(component.isFetching).toBeTrue();
    expect(component.reset).toHaveBeenCalled();
    tick(1500);
    expect(component.emptyDataErrorMessage).toEqual('No data');
    expect(component.isFetching).toBeFalse();
  }));

  it('should reset', () => {
    component.reset();
    expect(component.gridData).toEqual([]);
    expect(component.hasError).toEqual(false);
    expect(component.loadDataErrorMessage).toEqual('');
    expect(component.emptyDataErrorMessage).toEqual('');
  });

  it('should get data', () => {
    spyOn(mockData, 'map');
    E2eTestComponent.getData();
    expect(mockData.map).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { E2eProtectedComponent } from './e2e-protected.component';
import { E2eProtectedModule } from './e2e-protected.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('E2eProtectedComponent', () => {
  let component: E2eProtectedComponent;
  let fixture: ComponentFixture<E2eProtectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [E2eProtectedModule, RouterTestingModule] });
    fixture = TestBed.createComponent(E2eProtectedComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

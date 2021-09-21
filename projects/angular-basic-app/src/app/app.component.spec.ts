import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { LogoutDialogService } from '@ce/platform-lib';

describe('AppComponent', () => {
  let component: AppComponent;
  let logoutDialogService: LogoutDialogService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [LogoutDialogService]
    });
    fixture = TestBed.createComponent(AppComponent);
    logoutDialogService = TestBed.inject(LogoutDialogService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onLogoutClick', () => {
    spyOn(logoutDialogService, 'openDialog');
    component.onLogoutClick();
    expect(logoutDialogService.openDialog);
  });
});

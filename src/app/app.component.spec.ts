import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Smart Fit'`, () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    const app = fixture.componentInstance;

    // Assert
    expect(app.title).toEqual('Smart Fit');
  });

  it('should render the app-home component', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Assert
    expect(compiled.querySelector('app-home')).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAppComponent } from './country-app.component';

describe('CountryAppComponent', () => {
  let component: CountryAppComponent;
  let fixture: ComponentFixture<CountryAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

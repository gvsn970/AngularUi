import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardFeaturesComponent } from './onboard-features.component';

describe('OnboardFeaturesComponent', () => {
  let component: OnboardFeaturesComponent;
  let fixture: ComponentFixture<OnboardFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

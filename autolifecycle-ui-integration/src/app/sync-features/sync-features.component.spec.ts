import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncFeaturesComponent } from './sync-features.component';

describe('SyncFeaturesComponent', () => {
  let component: SyncFeaturesComponent;
  let fixture: ComponentFixture<SyncFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

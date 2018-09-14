import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFeaturesComponent } from './list-of-features.component';

describe('ListOfFeaturesComponent', () => {
  let component: ListOfFeaturesComponent;
  let fixture: ComponentFixture<ListOfFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

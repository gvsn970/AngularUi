import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugzillaComponent } from './bugzilla.component';

describe('BugzillaComponent', () => {
  let component: BugzillaComponent;
  let fixture: ComponentFixture<BugzillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugzillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugzillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

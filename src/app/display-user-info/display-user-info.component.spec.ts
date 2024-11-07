import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserInfoComponent } from './display-user-info.component';

describe('DisplayUserInfoComponent', () => {
  let component: DisplayUserInfoComponent;
  let fixture: ComponentFixture<DisplayUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayUserInfoComponent]
    });
    fixture = TestBed.createComponent(DisplayUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserpostsComponent } from './all-userposts.component';

describe('AllUserpostsComponent', () => {
  let component: AllUserpostsComponent;
  let fixture: ComponentFixture<AllUserpostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllUserpostsComponent]
    });
    fixture = TestBed.createComponent(AllUserpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

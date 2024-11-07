import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTaskComponent } from './api-task.component';

describe('ApiTaskComponent', () => {
  let component: ApiTaskComponent;
  let fixture: ComponentFixture<ApiTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiTaskComponent]
    });
    fixture = TestBed.createComponent(ApiTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

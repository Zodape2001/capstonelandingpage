import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedappointmentsComponent } from './acceptedappointments.component';

describe('AcceptedappointmentsComponent', () => {
  let component: AcceptedappointmentsComponent;
  let fixture: ComponentFixture<AcceptedappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedappointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

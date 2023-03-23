import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  ViewChild,
  AfterViewInit,
  Injectable,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { PhysicianService } from '../../physician.service';
import { DeleteappointmentsComponent } from '../deleteappointments/deleteappointments.component';
import { AcceptappointmentsComponent } from '../opendailogacceptappointment/acceptappointments.component';

export interface PeriodicElement {
  appointmentId: number;
  reason: string;
  date: string;
  acceptance: string;
  patientId: number;
  submissionDate: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-acceptedappointments',
  templateUrl: './acceptedappointments.component.html',
  styleUrls: ['./acceptedappointments.component.scss'],
})
export class AcceptedappointmentsComponent {ngOnInit(): void {
  this.getPendingAppointments();
  throw new Error('Method not implemented.');
}

// Date picker disable previous dates
title = 'datePicker';
currentDate: any = new Date();
ordinaryDateSelected!: Date;

displayedColumns: string[] = [
  'appointmentId',
  'patientId',
  'reason',
  'date',
  'submissionDate',
  'acceptance',
];
dataSource = new MatTableDataSource(ELEMENT_DATA);

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

// durationInSecond = 5;
constructor(
  private snakBar: MatSnackBar,
  private service: PhysicianService,
  private matDialog: MatDialog
) {}

pendingAppointmnt: any;
getPendingAppointments() {
  this.service
    .getPendingAppointments('p1@gmail.com', 'acceptance=accepted')
    .subscribe((response) => {
      this.pendingAppointmnt = response;
      console.log(this.pendingAppointmnt);
    });
}

//delete Appointments
rejectAppointment(appointmentId: any) {
  sessionStorage.setItem('appointmentid', appointmentId);
}

//Accept appointments
acceptappointment(appointmentId: any, patientId: any) {
  sessionStorage.setItem('appointmentid', appointmentId);
}

openDialogAcceptAppointments() {
  this.matDialog.open(AcceptappointmentsComponent),
    {
      Width: '300px',
    };
}

openDialogDeleteAppointments() {
  this.matDialog.open(DeleteappointmentsComponent),
    {
      Width: '800px',
    };
}

// openAcceptSnackbar(message: string, action: string) {
//   let snakBarRef = this.snakBar.open(message, action, { duration: 3000 });
//   snakBarRef.afterDismissed().subscribe();

//   snakBarRef.onAction().subscribe();
// }

// openrejectSnackbar(message: string, action: string) {
//   let snakBarRef = this.snakBar.open(message, action, { duration: 3000 });
//   snakBarRef.afterDismissed().subscribe();

//   snakBarRef.onAction().subscribe();
// }}
}
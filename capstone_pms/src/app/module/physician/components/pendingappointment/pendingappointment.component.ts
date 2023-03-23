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
import { AcceptappointmentsComponent } from '../acceptappointments/acceptappointments.component';
// import { PhysicianService } from 'src/app/service/physician.service';

export interface PeriodicElement {
  appointmentId: number;
  reason: string;
  date: string;
  acceptance: string;
  patientId: number;
  // physicianEmail: string;
  submissionDate: string;
  action1: string;
  action2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-pendingappointment',
  templateUrl: './pendingappointment.component.html',
  styleUrls: ['./pendingappointment.component.scss'],
})
export class PendingappointmentComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
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
    'acceptance',
    // 'physicianEmail',
    'submissionDate',
    'action',
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
      .getPendingAppointments('p1@gmail.com', 'acceptance=pending')
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
  // }
}

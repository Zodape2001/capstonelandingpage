import { DatePipe } from '@angular/common';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PhysicianService } from '../../physician.service';



export interface PeriodicElement {
  appointmentId: number;
  reason: string;
  date: string;
  acceptance: string;
  patientId: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'appointmentId',
    'patientId',
    'reason',
    'date',
    'acceptance',
    'action',
  ];

  constructor(private service: PhysicianService, private datePipe: DatePipe) {}
  ngOnInit(): void {
    // this.getTodaysAppointment();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
<<<<<<< HEAD

  currentDate: DatePipe = new DatePipe('en-us');
  dataSource: any;
  todaysAppointment: any;
  transformdate: any;
  email = 'p1@gmail.com';
  status = 'acceptance=accepted';
  getTodaysAppointment() {
    var date = new Date();
    this.transformdate = this.currentDate.transform(date, 'dd-MM-YYYY');
    console.log(this.transformdate);
=======
  currentDate1: DatePipe = new DatePipe('en-us');
  todayDate: Date = new Date();
  formattedDate:any;
  email = 'p1@gmail.com';
  status = 'acceptance=accepted';
  dataSource: any;
  todaysAppointment: any;
  transformdate :any;
  
  onDateSelected(selectedDate: string) {
    this.formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    console.log(this.formattedDate);
>>>>>>> 354bde7cd58f5595ed8ae6fa99052190b5641e05
    this.service
    .getTodaysAppointment(this.email, this.formattedDate, this.status)
    .subscribe((response) => {
      this.todaysAppointment = response;

<<<<<<< HEAD
        this.dataSource = new MatTableDataSource(this.todaysAppointment);
        this.dataSource.paginator = this.paginator;
=======
      console.log(this.transformdate);

      this.dataSource = new MatTableDataSource(this.todaysAppointment);
      this.dataSource.paginator = this.paginator;
>>>>>>> 354bde7cd58f5595ed8ae6fa99052190b5641e05
      });
  }
  currentDate: DatePipe = new DatePipe('en-us');
  // getTodaysAppointment() {
  //   var date = new Date();
  //   this.transformdate = this.currentDate.transform(date, 'dd-MM-YYYY');
  //   console.log(this.transformdate);
  //   this.service
  //     .getTodaysAppointment(this.email, this.transformdate, this.status)
  //     .subscribe((response) => {
  //       this.todaysAppointment = response;

  //       console.log(this.transformdate);

  //       this.dataSource = new MatTableDataSource(this.todaysAppointment);
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }

  getpatientidbyclick(patientid: any) {
    sessionStorage.setItem('setid', patientid);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

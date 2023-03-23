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
    this.service
    .getTodaysAppointment(this.email, this.formattedDate, this.status)
    .subscribe((response) => {
      this.todaysAppointment = response;

      console.log(this.transformdate);

      this.dataSource = new MatTableDataSource(this.todaysAppointment);
      this.dataSource.paginator = this.paginator;
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

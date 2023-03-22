import { DatePipe } from '@angular/common';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PhysicianService } from '../../physician.service';
// import { PhysicianService } from 'src/app/service/physician.service';

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
    'reason',
    'date',
    'acceptance',
    'patientId',
    'action',
  ];

  constructor(private service: PhysicianService, public datepipe: DatePipe) {}
  ngOnInit(): void {
    this.getTodaysAppointment();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  currentDate: DatePipe = new DatePipe('en-us');
  dataSource: any;
  todaysAppointment: any;
  transformdate = '22-03-2023';
  email = 'p1@gmail.com';
  status = 'acceptance=accepted';
  getTodaysAppointment() {
    var date = new Date();
    var transformdate = this.currentDate.transform(date, 'dd-MM-YYYY');
    console.log(transformdate);
    this.service
      .getTodaysAppointment(this.email, this.transformdate, this.status)
      .subscribe((response) => {
        this.todaysAppointment = response;
        console.log(this.todaysAppointment);

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      });
  }

  getpatientidbyclick(patientid: any) {
    sessionStorage.setItem('setid', patientid);
  }

  // ngAfterViewInit() {
  //   // this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ViewprescriptionComponent } from '../viewprescription/viewprescription.component';
import { PhysicianService } from '../../physician.service';

export interface PeriodicElement {
  testId: number;
  testName: string;
  result: string;
  testNotes: string;
  visitId: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-viewpetienthistory',
  templateUrl: './viewpetienthistory.component.html',
  styleUrls: ['./viewpetienthistory.component.scss'],
})
export class ViewpetienthistoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['testId', 'testName', 'result', 'testNotes'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private matDialog: MatDialog,
    private service: PhysicianService
  ) {}

  ngOnInit(): void {
    this.getPatientbyId();
    this.getallTest();
    this.getvisithistorydetailsbyid();
    throw new Error('Method not implemented.');
  }

  patientid: any = sessionStorage.getItem('setid');
  patientbyIdData: any;
  getPatientbyId() {
    console.log('this is patientid in history component ', this.patientid);
    this.service.getPatientbyId(this.patientid).subscribe((response) => {
      this.patientbyIdData = response;
      console.log('this is history', this.patientbyIdData);
    });
  }

  visitid: any;

  testdata: any;
  getallTest() {
    this.service.getallTest().subscribe((response) => {
      this.testdata = response;

      this.visitid = this.testdata[0].visitId;
      this.service.setvisitid(this.visitid);
      this.dataSource = new MatTableDataSource(this.testdata);
      console.log('this is test data in history', this.visitid);
    });
  }

  visistdetailsdata: any;
  getvisithistorydetailsbyid() {
    console.log(
      'this is patient id in getvisitdetailsbyid for history',
      this.patientid
    );
    this.service
      .getvisisthistorydetailsbyid(this.patientid)
      .subscribe((response) => {
        this.visistdetailsdata = response;
        console.log(this.visistdetailsdata);
      });
  }

  openDialogViewPrescription() {
    this.matDialog.open(ViewprescriptionComponent),
      {
        Width: '800px',
      };
  }
}

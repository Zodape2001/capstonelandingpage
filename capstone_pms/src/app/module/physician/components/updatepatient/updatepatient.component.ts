import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EnterprescriptionComponent } from '../enterprescription/enterprescription.component';
import { ViewprescriptionComponent } from '../viewprescription/viewprescription.component';
import { NewobservationComponent } from '../newobservation/newobservation.component';
// import { EditobservationComponent } from 'src/app/module/physician/components/editobservation.Component';
import { DeleteobservationComponent } from '../deleteobservation/deleteobservation.component';
import { PhysicianService } from 'src/app/module/physician/physician.service';
import { EditobservationComponent } from '../editobservation/editobservation.component';

export interface PeriodicElement {
  testId: number;
  testName: string;
  result: string;
  testNotes: string;
  visitId: number;
  // remarks: string;
  action1: string;
  action2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-updatepatient',
  templateUrl: './updatepatient.component.html',
  styleUrls: ['./updatepatient.component.scss'],
})
export class UpdatepatientComponent implements OnInit {
  visitid: any;
  ngOnInit(): void {
    this.getallTest();
    this.getallPatient();
    this.getPatientbyId();
    // this.delettestbyid();
    this.getvisitdetailsbyid();
    this.getvisithistorydetailsbyid();
  }
  displayedColumns: string[] = [
    'testId',
    'testName',
    'result',
    'testNotes',
    // 'remarks',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private matDialog: MatDialog,
    private service: PhysicianService
  ) {}

  //view previous history click

  viewprevioushistoryclick() {}

  dataSource: any;
  testdata: any;
  getallTest() {
    this.service.getallTest().subscribe((response) => {
      this.testdata = response;

      this.visitid = this.testdata[0].visitId;
      this.service.setvisitid(this.visitid);
      this.dataSource = new MatTableDataSource(this.testdata);
      this.dataSource.paginator = this.paginator;
      console.log(this.visitid);
    });
  }

  deleteidbyclick(teid: any) {
    sessionStorage.setItem('visitid', teid);
  }

  deletestbyiddata: any;
  patientdata: any;
  getallPatient() {
    this.service.getallPatient().subscribe((response) => {
      this.patientdata = response;
      console.log(this.patientdata);
    });
  }

  patientid: any = sessionStorage.getItem('setid');
  patientbyIdData: any;
  getPatientbyId() {
    console.log('this is patient id in getPatientbyId ', this.patientid);
    this.service.getPatientbyId(this.patientid).subscribe((response) => {
      this.patientbyIdData = response;
      console.log(this.patientbyIdData);
    });
  }

  // get visit detilas by patient id
  visistdetailsdata: any;
  getvisitdetailsbyid() {
    console.log('this is patient id in getvisitdetailsbyid', this.patientid);
    this.service.getvisitdetailsbyid(this.patientid).subscribe((response) => {
      this.visistdetailsdata = response;

      console.log('visit detials data', this.visistdetailsdata);
    });
  }

  oldvisitid: any;
  visisthistorydetailsdata: any;
  getvisithistorydetailsbyid() {
    console.log(
      'this is patient id in getvisit history detailsby id for history',
      this.patientid
    );

    this.service
      .getvisisthistorydetailsbyid(this.patientid)
      .subscribe((response) => {
        this.visisthistorydetailsdata = response;
        console.log(this.visisthistorydetailsdata);
      });
  }
  openDialogNewObservation() {
    this.matDialog.open(NewobservationComponent),
      {
        Width: '800px',
      };
  }

  openDialogEditObservation() {
    this.matDialog.open(EditobservationComponent),
      {
        Width: '800px',
      };
  }

  openDialogDeleteObservation() {
    this.matDialog.open(DeleteobservationComponent),
      {
        Width: '800px',
      };
  }

  openDialogEnterPrescription() {
    this.matDialog.open(EnterprescriptionComponent),
      {
        Width: '800px',
      };
  }
  openDialogViewPrescription() {
    this.matDialog.open(ViewprescriptionComponent),
      {
        Width: '800px',
      };
  }
}

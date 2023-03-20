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
export class UpdatepatientComponent implements AfterViewInit, OnInit {
  visitid: any;
  ngOnInit(): void {
    this.getallTest();
    this.getallPatient();
    this.getPatientbyId();
    this.delettestbyid();
  }
  displayedColumns: string[] = [
    'testId',
    'testName',
    'result',
    'testNotes',
    // 'remarks',
    'action',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private matDialog: MatDialog,
    private service: PhysicianService
  ) {}

  testdata: any;
  getallTest() {
    this.service.getallTest().subscribe((response) => {
      this.testdata = response;

      this.visitid = this.testdata[0].visitId;
      this.service.setvisitid(this.visitid);

      console.log(this.visitid);
    });
  }

  deletestbyiddata: any;
  delettestbyid() {
    this.service.deletetest(52).subscribe((response) => {
      this.deletestbyiddata = response;
      console.log('deleted');
    });
  }

  patientdata: any;
  getallPatient() {
    this.service.getallPatient().subscribe((response) => {
      this.patientdata = response;
      console.log(this.patientdata);
    });
  }

  patientbyIdData: any;
  getPatientbyId() {
    this.service.getPatientbyId(2).subscribe((response) => {
      this.patientbyIdData = response;
      console.log(this.patientbyIdData);
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

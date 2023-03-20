import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PhysicianService } from 'src/app/module/physician/physician.service';
export interface PeriodicElement {
  prescriptionId: number;
  prescriptionName: string;
  dosage: string;
  prescriptionNotes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-viewprescription',
  templateUrl: './viewprescription.component.html',
  styleUrls: ['./viewprescription.component.scss'],
})
export class ViewprescriptionComponent implements OnInit {

  constructor(private service: PhysicianService) { }

  ngOnInit() {
    this.getallPrescription();
    
  } 
  displayedColumns: string[] = [
    'prescriptionId',
    'prescriptionName',
    'dosage',
    'prescriptionNotes'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

    prescriptiondata:any
  getallPrescription() {
    this.service.getallPrescription().subscribe(respones => {
      this.prescriptiondata = respones
      console.log(this.getallPrescription)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
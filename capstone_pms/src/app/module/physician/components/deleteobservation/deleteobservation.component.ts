import { Component, OnInit } from '@angular/core';
import { PhysicianService } from '../../physician.service';

@Component({
  selector: 'app-deleteobservation',
  templateUrl: './deleteobservation.component.html',
  styleUrls: ['./deleteobservation.component.scss'],
})
export class DeleteobservationComponent implements OnInit {
  constructor(private service: PhysicianService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  testid: any = sessionStorage.getItem('visitid');

  deletestbyiddata: any;
  delete() {
    console.log('id to be delete', this.testid);
    this.service.deletetest(this.testid).subscribe((response) => {
      this.deletestbyiddata = response;
      console.log('deleted');
    });
  }
}

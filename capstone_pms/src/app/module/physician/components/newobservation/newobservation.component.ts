import { Component } from '@angular/core';
import { PhysicianService } from 'src/app/module/physician/physician.service';



export class Test {
  testId: any;
  testName: any;
  result: any;
  testNotes: any;
  visitId: any;

}

@Component({
  selector: 'app-newobservation',
  templateUrl: './newobservation.component.html',
  styleUrls: ['./newobservation.component.scss']
})
export class NewobservationComponent {

  constructor(private service: PhysicianService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  test: Test = new Test();
  visitId = this.service.getvisitid();
  
  saveObservation() {
    console.log(this.test);
    console.log(this.visitId);
    this.service.addObservation(this.test,this.visitId).subscribe(response => {
      console.log(this.test)
    })
  }

  onSubmit() {
    this.saveObservation();
  }
}

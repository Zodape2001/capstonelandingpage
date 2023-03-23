import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescription } from './components/enterprescription/enterprescription.component';
import { Test } from './components/newobservation/newobservation.component';

@Injectable({
  providedIn: 'root',
})
export class PhysicianService {
  constructor(private http: HttpClient) {}

  //Todays accepted appointment
  getTodaysAppointment(
    physicianEmail: string,
    date: string,
    acceptance: string
  ) {
    return this.http.get(
      'http://localhost:8081/appointment/' +
        physicianEmail +
        '/' +
        date +
        '?' +
        acceptance
    );
  }

  rejectAppointment(appointmentId: any) {
    return this.http.delete(
      `http://localhost:9005/appointment/${appointmentId}`
    );
  }

  //All pending appointments
  getPendingAppointments(physicianEmail: string, acceptance: string) {
    return this.http.get(
      'http://localhost:8081/appointment/' + physicianEmail + '?' + acceptance
    );
  }

  getallTest() {
    return this.http.get('http://localhost:8082/tests');
  }

  getallPatient() {
    return this.http.get('http://localhost:9005/patientinfo');
  }

  getallPrescription() {
    return this.http.get('http://localhost:8082/prescription');
  }

  getPatientbyId(patientId: number) {
    return this.http.get(`http://localhost:9005/patientinfo/${patientId}`);
  }

  enterePrescriptionFormData(data: any) {
    return this.http.post('http://localhost:8082/prescription', data);
  }

  addPrescription(prescription: Prescription, visitId: any) {
    prescription.visitId = visitId;
    return this.http.post(
      'http://localhost:8082/patient/prescription',
      prescription
    );
  }

  addObservation(test: Test, visitId: any) {
    test.visitId = visitId;
    return this.http.post('http://localhost:8082/savetest', test);
  }

  deletetest(testId: any) {
    console.log(testId);
    return this.http.delete(`http://localhost:8082/tests/${testId}`);
  }

  //accepted appointment
  acceptappointment(appointmentId: number, acceptance: String) {
    return this.http.put(
      'http://localhost:8081/appointments/' + appointmentId + '/' + acceptance,
      ''
    );
  }
  public myvar: any;
  public setvisitid(visitid: any) {
    this.myvar = visitid;
  }

  public getvisitid() {
    return this.myvar;
  }
}

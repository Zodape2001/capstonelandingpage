import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingappointmentComponent } from './components/pendingappointment/pendingappointment.component';
import { UpdatepatientComponent } from './components/updatepatient/updatepatient.component';
import { ViewpetienthistoryComponent } from './components/viewpetienthistory/viewpetienthistory.component';
import { PhysicianprofileComponent } from './components/physicianprofile/physicianprofile.component';
import { AcceptappointmentsComponent } from './components/opendailogacceptappointment/acceptappointments.component';
import { AcceptedappointmentsComponent } from './components/acceptedappointments/acceptedappointments.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: '/physician/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'pending-appointment',
        component: PendingappointmentComponent,
      },
      {
        path: 'accepted-appointment',
        component: AcceptedappointmentsComponent,
      },
      {
        path: 'update-patient',
        component: UpdatepatientComponent,
      },
      {
        path: 'patient-history',
        component: ViewpetienthistoryComponent,
      },
      {
        path: 'physician-profile',
        component: PhysicianprofileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicianRoutingModule {}

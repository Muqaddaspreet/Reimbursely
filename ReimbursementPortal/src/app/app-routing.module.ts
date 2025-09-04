import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpSignupComponent } from './employee/emp-signup/emp-signup.component';
import { EmpLoginComponent } from './employee/emp-login/emp-login.component';
import { EmpDashboardComponent } from './employee/emp-dashboard/emp-dashboard.component';
import { EmpAddDataComponent } from './employee/emp-add-data/emp-add-data.component';
import { EmpUpdateDataComponent } from './employee/emp-update-data/emp-update-data.component';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AdminApproveRequestComponent } from './admin/admin-approve-request/admin-approve-request.component';

const routes: Routes = [
  {
    path: '',
    component: EmpSignupComponent,
  },
  {
    path: 'login',
    component: EmpLoginComponent,
  },
  {
    path: 'empdash/:email',
    component: EmpDashboardComponent,
  },
  {
    path: 'add-data/:email',
    component: EmpAddDataComponent,
  },
  {
    path: 'update-data/:id/:email',
    component: EmpUpdateDataComponent,
  },
  {
    path: 'admindash',
    component: AdminDashComponent,
  },
  {
    path: 'approvereq/:id',
    component: AdminApproveRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

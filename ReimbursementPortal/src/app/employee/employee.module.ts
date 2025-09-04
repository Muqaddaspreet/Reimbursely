import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpSignupComponent } from './emp-signup/emp-signup.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpAddDataComponent } from './emp-add-data/emp-add-data.component';
import { EmpUpdateDataComponent } from './emp-update-data/emp-update-data.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EmpSignupComponent,
    EmpLoginComponent,
    EmpDashboardComponent,
    EmpAddDataComponent,
    EmpUpdateDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
})
export class EmployeeModule {}

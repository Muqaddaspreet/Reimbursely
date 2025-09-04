import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminApproveRequestComponent } from './admin-approve-request/admin-approve-request.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [AdminDashComponent, AdminApproveRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    OverlayModule,
  ],
})
export class AdminModule {}

import { Component, OnInit } from '@angular/core';
import { ReimbursementService } from 'src/app/shared/reimbursement.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css'],
})
export class AdminDashComponent implements OnInit {
  constructor(public service: ReimbursementService) {}
  collection: any = [];
  allReimbursements: any = []; // Store all reimbursements
  heading = '';
  key = 0;
  requestedBy = '';
  backendConnected = false;

  ngOnInit(): void {
    this.checkBackendConnection();
    this.service.getReimbursement().subscribe({
      next: (res: any) => {
        this.backendConnected = true;
        console.log('✅ Backend Connected Successfully');
        console.log('All reimbursements:', res);
        this.allReimbursements = res; // Store all reimbursements
        this.heading = 'Pending Requests';
        this.key = 0;
        const result = res.filter(
          (element: { status: any }) => element.status === 'PENDING'
        );
        console.log('Filtered pending requests:', result);
        this.collection = result;
      },
      error: (error: any) => {
        this.backendConnected = false;
        console.error('❌ Backend Connection Failed:', error);
        console.log('Backend Status: DISCONNECTED');
      },
    });
  }

  checkBackendConnection(): void {
    console.log('🔍 Checking backend connection...');
    // Additional health check if needed
  }

  pending() {
    this.heading = 'Pending Requests';
    this.key = 0;
    const result = this.allReimbursements.filter(
      (element: { status: any }) => element.status === 'PENDING'
    );
    this.collection = result;
  }

  decline() {
    this.heading = 'Declined Requests';
    this.key = 1;
    const result = this.allReimbursements.filter(
      (element: { status: string }) => element.status === 'REJECTED'
    );
    this.collection = result;
  }

  approve() {
    this.heading = 'Approved Requests';
    this.key = 2;
    const result = this.allReimbursements.filter(
      (element: { status: string }) => element.status === 'APPROVED'
    );
    console.log(result);
    this.collection = result;
  }

  declineRequest(ID: any) {
    const result = this.allReimbursements.filter(
      (element: { id: any }) => element.id === parseInt(ID)
    );
    const obj = result[0];
    console.log(obj);
    obj.status = 'REJECTED';
    this.service.updateReimbursement(ID, obj).subscribe((record: any) => {
      console.warn('record is here', record);
      alert('Request Declined');
      // Refresh the data
      this.service.getReimbursement().subscribe((res: any) => {
        this.allReimbursements = res;
        // Refresh current view
        if (this.key === 0) {
          this.pending();
        } else if (this.key === 1) {
          this.decline();
        } else if (this.key === 2) {
          this.approve();
        }
      });
    });
  }

  dropdown(dropValue: any) {
    console.warn(dropValue);
    // First get the base filtered data based on current view
    let baseData = [];
    if (this.key === 0) {
      baseData = this.allReimbursements.filter(
        (element: { status: any }) => element.status === 'PENDING'
      );
    } else if (this.key === 1) {
      baseData = this.allReimbursements.filter(
        (element: { status: string }) => element.status === 'REJECTED'
      );
    } else if (this.key === 2) {
      baseData = this.allReimbursements.filter(
        (element: { status: string }) => element.status === 'APPROVED'
      );
    }

    // Then filter by expense type
    const result = baseData.filter(
      (element: { expenseType: any }) => element.expenseType === dropValue
    );
    console.log('Result after filter', result);
    this.collection = result;
  }

  showAll() {
    // Reset to current view without type filter
    if (this.key === 0) {
      this.pending();
    } else if (this.key === 1) {
      this.decline();
    } else if (this.key === 2) {
      this.approve();
    }
  }

  SearchRequestedBy(email: string) {
    if (!email || email.trim() === '') {
      // If search is empty, show current view
      if (this.key === 0) {
        this.pending();
      } else if (this.key === 1) {
        this.decline();
      } else if (this.key === 2) {
        this.approve();
      }
      return;
    }

    // First get the base filtered data based on current view
    let baseData = [];
    if (this.key === 0) {
      baseData = this.allReimbursements.filter(
        (element: { status: any }) => element.status === 'PENDING'
      );
    } else if (this.key === 1) {
      baseData = this.allReimbursements.filter(
        (element: { status: string }) => element.status === 'REJECTED'
      );
    } else if (this.key === 2) {
      baseData = this.allReimbursements.filter(
        (element: { status: string }) => element.status === 'APPROVED'
      );
    }

    // Then filter by email
    const result = baseData.filter((element: { employeeEmail: string }) =>
      element.employeeEmail.toLowerCase().includes(email.toLowerCase())
    );
    console.log('search after filter', result);
    this.collection = result;
  }

  getPendingCount(): number {
    return this.allReimbursements.filter(
      (item: any) => item.status === 'PENDING'
    ).length;
  }

  getApprovedCount(): number {
    return this.allReimbursements.filter(
      (item: any) => item.status === 'APPROVED'
    ).length;
  }

  getDeclinedCount(): number {
    return this.allReimbursements.filter(
      (item: any) => item.status === 'REJECTED'
    ).length;
  }
}

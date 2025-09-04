import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReimbursementService } from 'src/app/shared/reimbursement.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public service: ReimbursementService
  ) {}
  collection: any = [];
  emailParams = this.route.snapshot.params['email'];
  backendConnected = false;

  ngOnInit(): void {
    this.emailParams = this.route.snapshot.params['email'];
    console.warn('Employee Email:', this.emailParams);
    this.checkBackendConnection();
    this.service.getReimbursement().subscribe({
      next: (res: any) => {
        this.backendConnected = true;
        console.log('✅ Backend Connected Successfully');
        console.log('All reimbursements:', res);
        const result = res.filter(
          (element: { employeeEmail: any }) =>
            element.employeeEmail === this.emailParams
        );
        console.log('Employee reimbursements:', result);

        function sortByDate(a: any, b: any) {
          if (a.expenseDate < b.expenseDate) {
            return 1;
          }
          if (a.expenseDate > b.expenseDate) {
            return -1;
          }
          return 0;
        }
        const newResult = result.sort(sortByDate);
        console.log('Sorted reimbursements:', newResult);
        this.collection = newResult;
        console.log('Final collection:', this.collection);
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

  deleteData(ID: any) {
    console.warn('ID is: ', ID);
    //this.collection.splice(item-1,1)
    this.service.deleteReimbursement(ID).subscribe((res: any) => {
      console.log('result', res);
      window.location.reload();
    });
  }

  getApprovedCount(): number {
    return this.collection.filter(
      (item: any) => (item.status || item.requestedPhase) === 'APPROVED'
    ).length;
  }

  getPendingCount(): number {
    return this.collection.filter(
      (item: any) =>
        (item.status || item.requestedPhase) === 'PENDING' ||
        (item.status || item.requestedPhase) === 'To be processed'
    ).length;
  }
}

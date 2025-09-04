import { Component, OnInit } from '@angular/core';
import { ReimbursementService } from './shared/reimbursement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ReimbursementPortal';
  backendStatus = 'Checking...';

  constructor(private reimbursementService: ReimbursementService) {}

  ngOnInit() {
    this.checkBackendStatus();
  }

  checkBackendStatus() {
    this.reimbursementService.checkBackendHealth().subscribe({
      next: () => {
        this.backendStatus = 'Connected';
        console.log('Backend is accessible');
      },
      error: (error) => {
        this.backendStatus = 'Disconnected';
        console.error('Backend connection failed:', error);
      },
    });
  }
}

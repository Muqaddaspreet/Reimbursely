import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReimbursementService } from 'src/app/shared/reimbursement.service';

@Component({
  selector: 'app-admin-approve-request',
  templateUrl: './admin-approve-request.component.html',
  styleUrls: ['./admin-approve-request.component.css'],
})
export class AdminApproveRequestComponent implements OnInit {
  approveData = new FormGroup({
    approvedBy: new FormControl('', [Validators.required]),
    approvedValue: new FormControl('', [Validators.required]),
    approvalNotes: new FormControl(''), // Optional field, no validators
  });

  get approvedBy() {
    return this.approveData.get('approvedBy');
  }
  get approvedValue() {
    return this.approveData.get('approvedValue');
  }
  get approvalNotes() {
    return this.approveData.get('approvalNotes');
  }

  constructor(
    public route: Router,
    public router: ActivatedRoute,
    public service: ReimbursementService
  ) {}

  ID = this.router.snapshot.params['id'];

  ngOnInit(): void {}

  approveCollection() {
    this.service.getReimbursement().subscribe((res: any) => {
      console.warn(this.ID);
      const result = res.filter(
        (element: { id: any }) => element.id === parseInt(this.ID)
      );
      const obj = result[0];
      console.warn(res);
      console.warn(result);
      const arr = this.approveData.value;
      console.log(arr);
      obj.status = 'APPROVED';
      obj.approvedBy = arr.approvedBy;
      obj.approvedValue = arr.approvedValue;
      obj.approvalDate = new Date();
      obj.approvalNotes = arr.approvalNotes; // Add approval notes
      console.warn('This is my object:', obj);
      this.service
        .updateReimbursement(this.ID, obj)
        .subscribe((record: any) => {
          console.warn('record is here', record);
          alert('Request Approved');
          setTimeout(() => {
            this.route.navigate(['admindash']);
          }, 2000);
        });
    });
  }
}

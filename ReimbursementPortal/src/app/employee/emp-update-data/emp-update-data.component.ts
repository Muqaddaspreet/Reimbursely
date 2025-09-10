import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReimbursementService } from 'src/app/shared/reimbursement.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-update-data',
  templateUrl: './emp-update-data.component.html',
  styleUrls: ['./emp-update-data.component.css'],
})
export class EmpUpdateDataComponent implements OnInit {
  edit = new FormGroup({
    employeeEmail: new FormControl(''),
    employeeName: new FormControl(''),
    expenseDate: new FormControl('', [Validators.required]),
    expenseType: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    //
    id: new FormControl(''),
    status: new FormControl(''),
    approvedBy: new FormControl(''),
    receiptAttached: new FormControl(''),
    receiptImageLink: new FormControl(''),
    submissionDate: new FormControl(''),
    approvalDate: new FormControl(''),
    rejectionReason: new FormControl(''),
  });
  emailParams = '';
  idParams = '';
  file: any;
  fileType: boolean = false;
  fileUploaded: boolean = false;

  constructor(
    public route: Router,
    public router: ActivatedRoute,
    public service: ReimbursementService
  ) {}

  ngOnInit(): void {
    this.idParams = this.router.snapshot.params['id'];
    this.emailParams = this.router.snapshot.params['email'];
    console.warn('ID:', this.idParams, 'Email:', this.emailParams);

    this.service
      .getReimbursementData(this.idParams)
      .subscribe((record: any) => {
        console.warn('result', record);
        this.edit = new FormGroup({
          employeeEmail: new FormControl(
            record['employeeEmail'] || record['requestedBy']
          ),
          employeeName: new FormControl(record['employeeName'] || 'Employee'),
          expenseDate: new FormControl(
            record['expenseDate']
              ? record['expenseDate'].split('T')[0]
              : record['date']?.split('T')[0]
          ),
          expenseType: new FormControl(
            record['expenseType'] || record['reimbursementType']
          ),
          amount: new FormControl(record['amount'] || record['requestedValue']),
          description: new FormControl(record['description'] || ''),
          currency: new FormControl(record['currency']),

          id: new FormControl(record['id'] || record['reimbursementID']),
          status: new FormControl(record['status'] || record['requestedPhase']),
          approvedBy: new FormControl(record['approvedBy']),
          receiptAttached: new FormControl(record['receiptAttached']),
          receiptImageLink: new FormControl(record['receiptImageLink']),
          submissionDate: new FormControl(record['submissionDate']),
          approvalDate: new FormControl(record['approvalDate']),
          rejectionReason: new FormControl(record['rejectionReason']),
        });
      });
    console.log('This is edit', this.edit.value);
  }

  updateCollection() {
    // Handle receipt attachment
    if (
      this.edit.get('receiptImageLink')?.value &&
      this.edit.get('receiptImageLink')?.value.trim() !== ''
    ) {
      this.edit.patchValue({ receiptAttached: 'Yes' });
    } else {
      this.edit.patchValue({ receiptAttached: 'No' });
    }

    // console.warn(this.edit.value);
    this.service
      .updateReimbursement(this.idParams, this.edit.value)
      .subscribe((record: any) => {
        console.warn('record is here', record);
        // Navigate immediately without alert
        this.route.navigate(['empdash', this.emailParams]);
      });
    // Removed delayed navigation to make UX snappier
  }

  fileSelected(event: any) {
    const file = event.target.files[0];
    if (file != null) {
      this.file = file;
      if (
        this.file.type != 'image/jpeg' &&
        this.file.type != 'application/pdf' &&
        this.file.type != 'image/png' &&
        this.file.type != 'image/jpg'
      ) {
        this.fileType = false;
        this.fileUploaded = false;
      } else {
        this.fileUploaded = true;
        this.fileType = true;

        // Convert file to base64 for storage
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.edit.patchValue({ receiptImageLink: e.target.result });
          console.log('File converted to base64');
        };
        reader.readAsDataURL(file);
      }
      console.log('File type:', this.file.type);
    }
  }

  get expenseDate() {
    return this.edit.get('expenseDate');
  }
  get expenseType() {
    return this.edit.get('expenseType');
  }
  get amount() {
    return this.edit.get('amount');
  }
  get description() {
    return this.edit.get('description');
  }
  get currency() {
    return this.edit.get('currency');
  }
}

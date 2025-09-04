import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ReimbursementService } from 'src/app/shared/reimbursement.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-emp-add-data',
  templateUrl: './emp-add-data.component.html',
  styleUrls: ['./emp-add-data.component.css'],
})
export class EmpAddDataComponent implements OnInit {
  @ViewChild('form') dataForm: NgForm;

  // add = new FormGroup({
  //   requestedBy: new FormControl(''),
  //   date: new FormControl(''),
  //   reimbursementType: new FormControl(''),
  //   requestedValue: new FormControl(''),
  //   currency: new FormControl(''),
  //   receiptImageLink:new FormControl(''),
  //   //
  //   reimbursementID:new FormControl(''),
  //   approvedValue:new FormControl(''),
  //   approvedBy:new FormControl(''),
  //   receiptAttached:new FormControl(''),
  //   requestedPhase:new FormControl(''),
  //   internalNotes:new FormControl('')
  // })
  constructor(
    public router: ActivatedRoute,
    public route: Router,
    public service: ReimbursementService
  ) {}
  emailParams = this.router.snapshot.params['email'];
  file!: File;
  fileType: boolean = false;
  fileUploaded: boolean = false;
  ngOnInit(): void {
    // Set the employee email and name in the service
    this.service.reimbursementData.employeeEmail = this.emailParams;
    // You might want to get the employee name from the user service or pass it as a parameter
    // For now, we'll set it to a placeholder
    this.service.reimbursementData.employeeName = 'Employee'; // This should be fetched from user data
    // Set default currency
    this.service.reimbursementData.currency = 'INR';
  }

  // onload()
  // {
  //   console.log("Form is:",this.dataForm);
  //   this.dataForm.form.patchValue({
  //     requestedBy:this.emailParams
  //   })
  // }

  onSubmit(myform: NgForm) {
    // console.log("Form again is:",this.dataForm);

    // Set the required fields
    this.service.reimbursementData.employeeEmail = this.emailParams;
    this.service.reimbursementData.employeeName = 'Employee'; // This should be fetched from user data
    this.service.reimbursementData.status = 'PENDING';
    this.service.reimbursementData.submissionDate = new Date();
    // Handle receipt attachment
    if (
      this.service.reimbursementData.receiptImageLink &&
      this.service.reimbursementData.receiptImageLink.trim() !== ''
    ) {
      this.service.reimbursementData.receiptAttached = 'Yes';
      console.log(
        'Receipt attached:',
        this.service.reimbursementData.receiptImageLink.substring(0, 50) + '...'
      );
    } else {
      this.service.reimbursementData.receiptAttached = 'No';
      this.service.reimbursementData.receiptImageLink = '';
    }
    console.warn(
      'receipt attached :  ',
      myform.form.get('receiptAttached')?.value
    );
    this.service.postReimbursementData().subscribe((res) => {
      console.warn(res);
      alert('Added successfully!!');
      setTimeout(() => {
        this.route.navigate(['empdash', this.emailParams]);
      }, 2000);
    });
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
          this.service.reimbursementData.receiptImageLink = e.target.result;
          console.log('File converted to base64');
        };
        reader.readAsDataURL(file);
      }
      console.log('File type:', this.file.type);
    }
  }

  // addReimbursement()
  // {
  //   console.warn(this.add.value);
  //   this.service.setStudent(this.add.value).subscribe((record:any)=>
  //   {
  //     console.warn('record is here',record);
  //     this.add.reset({})
  //     setTimeout(()=>
  //     {
  //       this.route.navigate(['empdash',this.emailParams]);
  //     },2000);
  //   })

  // }
}

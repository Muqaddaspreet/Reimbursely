import { Component, OnInit } from '@angular/core';
import { ReimbursementService } from 'src/app/shared/reimbursement.service';
import { NgModel, NgForm, NgControl, NgModelGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-signup',
  templateUrl: './emp-signup.component.html',
  styleUrls: ['./emp-signup.component.css'],
})
export class EmpSignupComponent implements OnInit {
  EmailAvailable = true;
  passwordMismatch = false;
  confirmPassword = '';

  constructor(public route: Router, public service: ReimbursementService) {}

  ngOnInit(): void {
    console.log('Signup component initialized');
  }

  checkPasswordMatch() {
    this.passwordMismatch =
      this.confirmPassword !== this.service.signupData.password;
  }

  onSubmit(form: NgForm) {
    if (this.passwordMismatch) {
      alert('Passwords do not match!');
      return;
    }

    const em = form.controls['email'].value;
    console.warn('This is the email', em);

    this.service.getSignup().subscribe({
      next: (record: any) => {
        this.EmailAvailable = true;
        const obj = record.find((a: any) => a.email == em);

        if (obj) {
          console.warn('Email is not available');
          this.EmailAvailable = false;
          alert('Email already exists!');
          return;
        }

        console.warn('Email Available: ', this.EmailAvailable);
        if (this.EmailAvailable) {
          this.service.postSignup().subscribe({
            next: (res) => {
              console.warn(res);
              alert('Signup successful!!');
              setTimeout(() => {
                this.route.navigate(['login']);
              }, 2000);
            },
            error: (error) => {
              console.error('Signup error:', error);
              alert('Signup failed! Please try again.');
            },
          });
        }
      },
      error: (error) => {
        console.error('Error checking email:', error);
        alert('Error checking email availability. Please try again.');
      },
    });
  }
}

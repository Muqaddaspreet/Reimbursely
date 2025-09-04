import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/shared/reimbursement.service';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css'],
})
export class EmpLoginComponent implements OnInit {
  loginData = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.loginData.get('email');
  }
  get password() {
    return this.loginData.get('password');
  }

  constructor(public route: Router, public service: ReimbursementService) {}

  ngOnInit(): void {}

  Login() {
    if (this.loginData.invalid) {
      alert('Please fill in all required fields!');
      return;
    }

    this.service.getSignup().subscribe({
      next: (record: any) => {
        var user = false;
        var adminFlag = 0;
        var userID = null;

        const objID = record.find((a: any) => {
          if (
            a.email === this.loginData.value.email &&
            a.password === this.loginData.value.password
          ) {
            user = true;
            adminFlag = a.isApprover;
            userID = a.signUpID;
            return true;
          }
          return false;
        });

        if (user && userID) {
          console.warn('ID is: ', userID);
          console.warn('IsApprover: ', adminFlag);

          // Store email before resetting the form
          const userEmail = this.loginData.value.email;
          this.loginData.reset();

          if (adminFlag == 1) {
            alert('Login successful! Redirecting to Admin Dashboard...');
            setTimeout(() => {
              this.route.navigate(['admindash']);
            }, 2000);
          } else {
            alert('Login successful! Redirecting to Employee Dashboard...');
            setTimeout(() => {
              this.route.navigate(['empdash', userEmail]);
            }, 2000);
          }
        } else {
          alert('Invalid email or password!');
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Login failed! Please check your connection and try again.');
      },
    });
  }
}

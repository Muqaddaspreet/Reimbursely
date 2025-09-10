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

    const emailLower = (this.loginData.value.email as string)?.toLowerCase();
    const passwordValue = this.loginData.value.password;

    this.service.getSignup().subscribe({
      next: (record: any) => {
        var user = false;
        var adminFlag = 0;
        var userID = null;

        const objID = record.find((a: any) => {
          if (
            (a.email as string)?.toLowerCase() === emailLower &&
            a.password === passwordValue
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

          // Use normalized email for navigation, without changing control value
          const userEmail = emailLower;
          this.loginData.reset();

          if (adminFlag == 1) {
            this.route.navigate(['admindash']);
          } else {
            this.route.navigate(['empdash', userEmail]);
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

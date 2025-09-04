import { Injectable } from '@angular/core';
import { ReimbursementData } from '../models/reimbursement-data.model';
import { Signup } from '../models/signup.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementService {
  constructor(private http: HttpClient) {}

  signupData: Signup = new Signup();
  reimbursementData: ReimbursementData = new ReimbursementData();
  readonly baseSignupURL = 'http://localhost:10253/api/Signup';
  readonly baseReimbursementDataURL =
    'http://localhost:10253/api/ReimbursementData';

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Check if backend is available
  checkBackendHealth(): Observable<any> {
    return this.http
      .get(this.baseSignupURL)
      .pipe(retry(1), catchError(this.handleError));
  }

  postSignup(): Observable<any> {
    return this.http
      .post(this.baseSignupURL, this.signupData)
      .pipe(catchError(this.handleError));
  }

  postReimbursementData(): Observable<any> {
    return this.http
      .post(this.baseReimbursementDataURL, this.reimbursementData)
      .pipe(catchError(this.handleError));
  }

  getSignup(): Observable<any> {
    return this.http
      .get(this.baseSignupURL)
      .pipe(retry(1), catchError(this.handleError));
  }

  getReimbursement(): Observable<any> {
    return this.http
      .get(this.baseReimbursementDataURL)
      .pipe(retry(1), catchError(this.handleError));
  }

  getReimbursementData(id: any): Observable<any> {
    return this.http
      .get(`${this.baseReimbursementDataURL}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateReimbursement(id: any, data: any): Observable<any> {
    return this.http
      .put(`${this.baseReimbursementDataURL}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteReimbursement(id: any): Observable<any> {
    return this.http
      .delete(`${this.baseReimbursementDataURL}/${id}`)
      .pipe(catchError(this.handleError));
  }
}

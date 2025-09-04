export class ReimbursementData {
  id: number = 0;
  employeeName: string = '';
  employeeEmail: string = '';
  expenseType: string = '';
  amount: number = 0;
  approvedValue: number = 0;
  currency: string = '';
  description: string = '';
  expenseDate: Date = new Date();
  submissionDate: Date = new Date();
  status: string = 'PENDING';
  approvedBy: string = '';
  approvalDate: Date = new Date();
  rejectionReason: string = '';
  // Legacy fields for backward compatibility
  reimbursementID: number = 0;
  date: Date = new Date('1990-01-01');
  reimbursementType: string = '';
  requestedBy: string = '';
  requestedValue: number = 0;
  receiptAttached: string = '';
  receiptImageLink: string = '';
  requestedPhase: string = 'To be processed';
  internalNotes: string = '';
}

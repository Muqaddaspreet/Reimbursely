package com.reimbursely.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "reimbursement_data")
public class ReimbursementData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Employee name is required")
    @Column(name = "employee_name", nullable = false)
    private String employeeName;
    
    @NotBlank(message = "Employee email is required")
    @Email(message = "Email should be valid")
    @Column(name = "employee_email", nullable = false)
    private String employeeEmail;
    
    @NotBlank(message = "Expense type is required")
    @Column(name = "expense_type", nullable = false)
    private String expenseType;
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;
    
    @Column(name = "approved_value", precision = 10, scale = 2)
    private BigDecimal approvedValue;
    
    @Column(name = "currency", length = 10)
    private String currency;
    
    @NotBlank(message = "Description is required")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Expense date is required")
    @Column(name = "expense_date", nullable = false)
    private LocalDate expenseDate;
    
    @Column(name = "submission_date")
    private LocalDate submissionDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ReimbursementStatus status = ReimbursementStatus.PENDING;
    
    @Column(name = "approved_by")
    private String approvedBy;
    
    @Column(name = "approval_date")
    private LocalDate approvalDate;
    
    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;
    
    @Column(name = "receipt_attached")
    private String receiptAttached;
    
    @Column(name = "receipt_image_link", columnDefinition = "TEXT")
    private String receiptImageLink;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    
    // Default constructor
    public ReimbursementData() {
        this.submissionDate = LocalDate.now();
    }
    
    // Constructor with required fields
    public ReimbursementData(String employeeName, String employeeEmail, String expenseType, 
                           BigDecimal amount, String description, LocalDate expenseDate) {
        this.employeeName = employeeName;
        this.employeeEmail = employeeEmail;
        this.expenseType = expenseType;
        this.amount = amount;
        this.description = description;
        this.expenseDate = expenseDate;
        this.submissionDate = LocalDate.now();
        this.status = ReimbursementStatus.PENDING;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmployeeName() {
        return employeeName;
    }
    
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
    
    public String getEmployeeEmail() {
        return employeeEmail;
    }
    
    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }
    
    public String getExpenseType() {
        return expenseType;
    }
    
    public void setExpenseType(String expenseType) {
        this.expenseType = expenseType;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public BigDecimal getApprovedValue() {
        return approvedValue;
    }
    
    public void setApprovedValue(BigDecimal approvedValue) {
        this.approvedValue = approvedValue;
    }
    
    public String getCurrency() {
        return currency;
    }
    
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDate getExpenseDate() {
        return expenseDate;
    }
    
    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }
    
    public LocalDate getSubmissionDate() {
        return submissionDate;
    }
    
    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }
    
    public ReimbursementStatus getStatus() {
        return status;
    }
    
    public void setStatus(ReimbursementStatus status) {
        this.status = status;
    }
    
    public String getApprovedBy() {
        return approvedBy;
    }
    
    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }
    
    public LocalDate getApprovalDate() {
        return approvalDate;
    }
    
    public void setApprovalDate(LocalDate approvalDate) {
        this.approvalDate = approvalDate;
    }
    
    public String getRejectionReason() {
        return rejectionReason;
    }
    
    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
    
    public String getReceiptAttached() {
        return receiptAttached;
    }
    
    public void setReceiptAttached(String receiptAttached) {
        this.receiptAttached = receiptAttached;
    }
    
    public String getReceiptImageLink() {
        return receiptImageLink;
    }
    
    public void setReceiptImageLink(String receiptImageLink) {
        this.receiptImageLink = receiptImageLink;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    @Override
    public String toString() {
        return "ReimbursementData{" +
                "id=" + id +
                ", employeeName='" + employeeName + '\'' +
                ", employeeEmail='" + employeeEmail + '\'' +
                ", expenseType='" + expenseType + '\'' +
                ", amount=" + amount +
                ", approvedValue=" + approvedValue +
                ", currency='" + currency + '\'' +
                ", description='" + description + '\'' +
                ", expenseDate=" + expenseDate +
                ", submissionDate=" + submissionDate +
                ", status=" + status +
                ", approvedBy='" + approvedBy + '\'' +
                ", approvalDate=" + approvalDate +
                ", rejectionReason='" + rejectionReason + '\'' +
                ", receiptAttached='" + receiptAttached + '\'' +
                ", receiptImageLink='" + receiptImageLink + '\'' +
                '}';
    }
}

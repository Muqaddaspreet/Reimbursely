package com.reimbursely.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sign_up_id")
    private Long signUpID;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique = true, nullable = false)
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", 
             message = "Password must contain at least 1 letter, 1 number, and 1 special character")
    @Column(nullable = false)
    private String password;
    
    @NotBlank(message = "Full name is required")
    @Pattern(regexp = "^[A-Za-z ]*$", message = "Full name should contain only alphabets")
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    @NotBlank(message = "PAN number is required")
    @Pattern(regexp = "[a-zA-Z0-9]{10}", message = "PAN number must be 10 alphanumeric characters")
    @Column(name = "pan_number", nullable = false)
    private String panNumber;
    
    @NotBlank(message = "Bank is required")
    @Column(nullable = false)
    private String bank;
    
    @NotBlank(message = "Bank account number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Bank account number must be 12 digits")
    @Column(name = "bank_account_number", nullable = false)
    private String bankAccountNumber;
    
    @Column(name = "is_approver", nullable = false)
    private Integer isApprover = 0; // 0 = Employee, 1 = Admin
    
    // Default constructor
    public User() {}
    
    // Constructor with all fields
    public User(String email, String password, String fullName, String panNumber, 
                String bank, String bankAccountNumber, Integer isApprover) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.panNumber = panNumber;
        this.bank = bank;
        this.bankAccountNumber = bankAccountNumber;
        this.isApprover = isApprover;
    }
    
    // Getters and Setters
    public Long getSignUpID() {
        return signUpID;
    }
    
    public void setSignUpID(Long signUpID) {
        this.signUpID = signUpID;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getPanNumber() {
        return panNumber;
    }
    
    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }
    
    public String getBank() {
        return bank;
    }
    
    public void setBank(String bank) {
        this.bank = bank;
    }
    
    public String getBankAccountNumber() {
        return bankAccountNumber;
    }
    
    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }
    
    public Integer getIsApprover() {
        return isApprover;
    }
    
    public void setIsApprover(Integer isApprover) {
        this.isApprover = isApprover;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "signUpID=" + signUpID +
                ", email='" + email + '\'' +
                ", fullName='" + fullName + '\'' +
                ", panNumber='" + panNumber + '\'' +
                ", bank='" + bank + '\'' +
                ", bankAccountNumber='" + bankAccountNumber + '\'' +
                ", isApprover=" + isApprover +
                '}';
    }
}

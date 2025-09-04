package com.reimbursely.repository;

import com.reimbursely.entity.ReimbursementData;
import com.reimbursely.entity.ReimbursementStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReimbursementDataRepository extends JpaRepository<ReimbursementData, Long> {
    
    /**
     * Find reimbursements by employee email
     */
    List<ReimbursementData> findByEmployeeEmail(String employeeEmail);
    
    /**
     * Find reimbursements by status
     */
    List<ReimbursementData> findByStatus(ReimbursementStatus status);
    
    /**
     * Find pending reimbursements
     */
    @Query("SELECT r FROM ReimbursementData r WHERE r.status = 'PENDING' ORDER BY r.submissionDate DESC")
    List<ReimbursementData> findPendingReimbursements();
    
    /**
     * Find reimbursements by employee email and status
     */
    List<ReimbursementData> findByEmployeeEmailAndStatus(String employeeEmail, ReimbursementStatus status);
    
    /**
     * Find reimbursements submitted between dates
     */
    @Query("SELECT r FROM ReimbursementData r WHERE r.submissionDate BETWEEN :startDate AND :endDate")
    List<ReimbursementData> findBySubmissionDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    /**
     * Find reimbursements by expense type
     */
    List<ReimbursementData> findByExpenseType(String expenseType);
    
    /**
     * Find reimbursements by amount greater than
     */
    @Query("SELECT r FROM ReimbursementData r WHERE r.amount > :amount")
    List<ReimbursementData> findByAmountGreaterThan(@Param("amount") Double amount);
    
    /**
     * Count reimbursements by status
     */
    long countByStatus(ReimbursementStatus status);
    
    /**
     * Count reimbursements by employee email
     */
    long countByEmployeeEmail(String employeeEmail);
}

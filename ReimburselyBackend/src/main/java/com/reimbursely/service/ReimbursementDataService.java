package com.reimbursely.service;

import com.reimbursely.entity.ReimbursementData;
import com.reimbursely.entity.ReimbursementStatus;
import com.reimbursely.entity.User;
import com.reimbursely.repository.ReimbursementDataRepository;
import com.reimbursely.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementDataService {
    
    @Autowired
    private ReimbursementDataRepository reimbursementDataRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Create new reimbursement request
     */
    public ReimbursementData createReimbursement(ReimbursementData reimbursementData) {
        // Validate user exists
        User user = userRepository.findByEmail(reimbursementData.getEmployeeEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + reimbursementData.getEmployeeEmail()));
        
        // Set user reference
        reimbursementData.setUser(user);
        
        // Set default values
        reimbursementData.setStatus(ReimbursementStatus.PENDING);
        reimbursementData.setSubmissionDate(LocalDate.now());
        
        return reimbursementDataRepository.save(reimbursementData);
    }
    
    /**
     * Get all reimbursements
     */
    public List<ReimbursementData> getAllReimbursements() {
        return reimbursementDataRepository.findAll();
    }
    
    /**
     * Get reimbursement by ID
     */
    public Optional<ReimbursementData> getReimbursementById(Long id) {
        return reimbursementDataRepository.findById(id);
    }
    
    /**
     * Get reimbursements by employee email
     */
    public List<ReimbursementData> getReimbursementsByEmployeeEmail(String email) {
        return reimbursementDataRepository.findByEmployeeEmail(email);
    }
    
    /**
     * Get reimbursements by status
     */
    public List<ReimbursementData> getReimbursementsByStatus(ReimbursementStatus status) {
        return reimbursementDataRepository.findByStatus(status);
    }
    
    /**
     * Get pending reimbursements
     */
    public List<ReimbursementData> getPendingReimbursements() {
        return reimbursementDataRepository.findPendingReimbursements();
    }
    
    /**
     * Update reimbursement
     */
    public ReimbursementData updateReimbursement(Long id, ReimbursementData reimbursementDetails) {
        ReimbursementData reimbursement = reimbursementDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reimbursement not found with id: " + id));
        
        // Update basic fields
        if (reimbursementDetails.getExpenseType() != null) {
            reimbursement.setExpenseType(reimbursementDetails.getExpenseType());
        }
        if (reimbursementDetails.getAmount() != null) {
            reimbursement.setAmount(reimbursementDetails.getAmount());
        }
        if (reimbursementDetails.getDescription() != null) {
            reimbursement.setDescription(reimbursementDetails.getDescription());
        }
        if (reimbursementDetails.getExpenseDate() != null) {
            reimbursement.setExpenseDate(reimbursementDetails.getExpenseDate());
        }
        if (reimbursementDetails.getEmployeeName() != null) {
            reimbursement.setEmployeeName(reimbursementDetails.getEmployeeName());
        }
        if (reimbursementDetails.getEmployeeEmail() != null) {
            reimbursement.setEmployeeEmail(reimbursementDetails.getEmployeeEmail());
        }
        
        // Update approval fields
        if (reimbursementDetails.getStatus() != null) {
            reimbursement.setStatus(reimbursementDetails.getStatus());
        }
        if (reimbursementDetails.getApprovedBy() != null) {
            reimbursement.setApprovedBy(reimbursementDetails.getApprovedBy());
        }
        if (reimbursementDetails.getApprovedValue() != null) {
            reimbursement.setApprovedValue(reimbursementDetails.getApprovedValue());
        }
        if (reimbursementDetails.getApprovalDate() != null) {
            reimbursement.setApprovalDate(reimbursementDetails.getApprovalDate());
        }
        if (reimbursementDetails.getRejectionReason() != null) {
            reimbursement.setRejectionReason(reimbursementDetails.getRejectionReason());
        }
        if (reimbursementDetails.getCurrency() != null) {
            reimbursement.setCurrency(reimbursementDetails.getCurrency());
        }
        if (reimbursementDetails.getReceiptAttached() != null) {
            reimbursement.setReceiptAttached(reimbursementDetails.getReceiptAttached());
        }
        if (reimbursementDetails.getReceiptImageLink() != null) {
            reimbursement.setReceiptImageLink(reimbursementDetails.getReceiptImageLink());
        }
        
        return reimbursementDataRepository.save(reimbursement);
    }
    
    /**
     * Approve reimbursement
     */
    public ReimbursementData approveReimbursement(Long id, String approvedBy) {
        ReimbursementData reimbursement = reimbursementDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reimbursement not found with id: " + id));
        
        reimbursement.setStatus(ReimbursementStatus.APPROVED);
        reimbursement.setApprovedBy(approvedBy);
        reimbursement.setApprovalDate(LocalDate.now());
        
        return reimbursementDataRepository.save(reimbursement);
    }
    
    /**
     * Reject reimbursement
     */
    public ReimbursementData rejectReimbursement(Long id, String rejectedBy, String rejectionReason) {
        ReimbursementData reimbursement = reimbursementDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reimbursement not found with id: " + id));
        
        reimbursement.setStatus(ReimbursementStatus.REJECTED);
        reimbursement.setApprovedBy(rejectedBy);
        reimbursement.setApprovalDate(LocalDate.now());
        reimbursement.setRejectionReason(rejectionReason);
        
        return reimbursementDataRepository.save(reimbursement);
    }
    
    /**
     * Delete reimbursement
     */
    public void deleteReimbursement(Long id) {
        ReimbursementData reimbursement = reimbursementDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reimbursement not found with id: " + id));
        reimbursementDataRepository.delete(reimbursement);
    }
    
    /**
     * Get reimbursements by date range
     */
    public List<ReimbursementData> getReimbursementsByDateRange(LocalDate startDate, LocalDate endDate) {
        return reimbursementDataRepository.findBySubmissionDateBetween(startDate, endDate);
    }
    
    /**
     * Get reimbursements by expense type
     */
    public List<ReimbursementData> getReimbursementsByExpenseType(String expenseType) {
        return reimbursementDataRepository.findByExpenseType(expenseType);
    }
    
    /**
     * Get reimbursement statistics
     */
    public ReimbursementStatistics getReimbursementStatistics() {
        long totalPending = reimbursementDataRepository.countByStatus(ReimbursementStatus.PENDING);
        long totalApproved = reimbursementDataRepository.countByStatus(ReimbursementStatus.APPROVED);
        long totalRejected = reimbursementDataRepository.countByStatus(ReimbursementStatus.REJECTED);
        
        return new ReimbursementStatistics(totalPending, totalApproved, totalRejected);
    }
    
    /**
     * Inner class for statistics
     */
    public static class ReimbursementStatistics {
        private final long pendingCount;
        private final long approvedCount;
        private final long rejectedCount;
        
        public ReimbursementStatistics(long pendingCount, long approvedCount, long rejectedCount) {
            this.pendingCount = pendingCount;
            this.approvedCount = approvedCount;
            this.rejectedCount = rejectedCount;
        }
        
        // Getters
        public long getPendingCount() { return pendingCount; }
        public long getApprovedCount() { return approvedCount; }
        public long getRejectedCount() { return rejectedCount; }
        public long getTotalCount() { return pendingCount + approvedCount + rejectedCount; }
    }
}

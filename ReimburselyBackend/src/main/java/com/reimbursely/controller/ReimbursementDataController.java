package com.reimbursely.controller;

import com.reimbursely.entity.ReimbursementData;
import com.reimbursely.entity.ReimbursementStatus;
import com.reimbursely.service.ReimbursementDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ReimbursementData")
@CrossOrigin(origins = "http://localhost:4200")
public class ReimbursementDataController {
    
    @Autowired
    private ReimbursementDataService reimbursementDataService;
    
    /**
     * Create new reimbursement request
     */
    @PostMapping
    public ResponseEntity<?> createReimbursement(@Valid @RequestBody ReimbursementData reimbursementData) {
        try {
            ReimbursementData createdReimbursement = reimbursementDataService.createReimbursement(reimbursementData);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReimbursement);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get all reimbursements
     */
    @GetMapping
    public ResponseEntity<List<ReimbursementData>> getAllReimbursements() {
        List<ReimbursementData> reimbursements = reimbursementDataService.getAllReimbursements();
        return ResponseEntity.ok(reimbursements);
    }
    
    /**
     * Get reimbursement by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReimbursementData> getReimbursementById(@PathVariable Long id) {
        return reimbursementDataService.getReimbursementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Get reimbursements by employee email
     */
    @GetMapping("/employee/{email}")
    public ResponseEntity<List<ReimbursementData>> getReimbursementsByEmployeeEmail(@PathVariable String email) {
        List<ReimbursementData> reimbursements = reimbursementDataService.getReimbursementsByEmployeeEmail(email);
        return ResponseEntity.ok(reimbursements);
    }
    
    /**
     * Get reimbursements by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getReimbursementsByStatus(@PathVariable String status) {
        try {
            ReimbursementStatus reimbursementStatus = ReimbursementStatus.valueOf(status.toUpperCase());
            List<ReimbursementData> reimbursements = reimbursementDataService.getReimbursementsByStatus(reimbursementStatus);
            return ResponseEntity.ok(reimbursements);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid status: " + status);
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get pending reimbursements
     */
    @GetMapping("/pending")
    public ResponseEntity<List<ReimbursementData>> getPendingReimbursements() {
        List<ReimbursementData> reimbursements = reimbursementDataService.getPendingReimbursements();
        return ResponseEntity.ok(reimbursements);
    }
    
    /**
     * Update reimbursement
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReimbursement(@PathVariable Long id, @Valid @RequestBody ReimbursementData reimbursementDetails) {
        try {
            ReimbursementData updatedReimbursement = reimbursementDataService.updateReimbursement(id, reimbursementDetails);
            return ResponseEntity.ok(updatedReimbursement);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Approve reimbursement
     */
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveReimbursement(@PathVariable Long id, @RequestParam String approvedBy) {
        try {
            ReimbursementData approvedReimbursement = reimbursementDataService.approveReimbursement(id, approvedBy);
            return ResponseEntity.ok(approvedReimbursement);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Reject reimbursement
     */
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectReimbursement(@PathVariable Long id, 
                                              @RequestParam String rejectedBy, 
                                              @RequestParam String rejectionReason) {
        try {
            ReimbursementData rejectedReimbursement = reimbursementDataService.rejectReimbursement(id, rejectedBy, rejectionReason);
            return ResponseEntity.ok(rejectedReimbursement);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Delete reimbursement
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReimbursement(@PathVariable Long id) {
        try {
            reimbursementDataService.deleteReimbursement(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Get reimbursements by date range
     */
    @GetMapping("/date-range")
    public ResponseEntity<List<ReimbursementData>> getReimbursementsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ReimbursementData> reimbursements = reimbursementDataService.getReimbursementsByDateRange(startDate, endDate);
        return ResponseEntity.ok(reimbursements);
    }
    
    /**
     * Get reimbursements by expense type
     */
    @GetMapping("/expense-type/{expenseType}")
    public ResponseEntity<List<ReimbursementData>> getReimbursementsByExpenseType(@PathVariable String expenseType) {
        List<ReimbursementData> reimbursements = reimbursementDataService.getReimbursementsByExpenseType(expenseType);
        return ResponseEntity.ok(reimbursements);
    }
    
    /**
     * Get reimbursement statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<ReimbursementDataService.ReimbursementStatistics> getReimbursementStatistics() {
        ReimbursementDataService.ReimbursementStatistics statistics = reimbursementDataService.getReimbursementStatistics();
        return ResponseEntity.ok(statistics);
    }
}

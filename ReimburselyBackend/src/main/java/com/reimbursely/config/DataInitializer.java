package com.reimbursely.config;

import com.reimbursely.entity.ReimbursementData;
import com.reimbursely.entity.ReimbursementStatus;
import com.reimbursely.entity.User;
import com.reimbursely.repository.ReimbursementDataRepository;
import com.reimbursely.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ReimbursementDataRepository reimbursementDataRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize sample data only if no users exist
        if (userRepository.count() == 0) {
            initializeSampleData();
        }
    }
    
    private void initializeSampleData() {
        // Create sample admin user
        User adminUser = new User();
        adminUser.setEmail("admin@reimbursely.com");
        adminUser.setPassword("Admin@123");
        adminUser.setFullName("Admin User");
        adminUser.setPanNumber("ABCDE1234F");
        adminUser.setBank("SBI");
        adminUser.setBankAccountNumber("123456789012");
        adminUser.setIsApprover(1);
        userRepository.save(adminUser);
        
        // Create sample employee users
        User employee1 = new User();
        employee1.setEmail("john.doe@reimbursely.com");
        employee1.setPassword("John@123");
        employee1.setFullName("John Doe");
        employee1.setPanNumber("FGHIJ5678K");
        employee1.setBank("HDFC");
        employee1.setBankAccountNumber("987654321098");
        employee1.setIsApprover(0);
        userRepository.save(employee1);
        
        User employee2 = new User();
        employee2.setEmail("jane.smith@reimbursely.com");
        employee2.setPassword("Jane@123");
        employee2.setFullName("Jane Smith");
        employee2.setPanNumber("LMNOP9012Q");
        employee2.setBank("ICICI");
        employee2.setBankAccountNumber("456789123456");
        employee2.setIsApprover(0);
        userRepository.save(employee2);
        
        // Create sample reimbursement requests
        ReimbursementData reimbursement1 = new ReimbursementData();
        reimbursement1.setEmployeeName("John Doe");
        reimbursement1.setEmployeeEmail("john.doe@reimbursely.com");
        reimbursement1.setExpenseType("Travel");
        reimbursement1.setAmount(new BigDecimal("1500.00"));
        reimbursement1.setDescription("Business trip to client site");
        reimbursement1.setExpenseDate(LocalDate.now().minusDays(5));
        reimbursement1.setStatus(ReimbursementStatus.PENDING);
        reimbursement1.setUser(employee1);
        reimbursementDataRepository.save(reimbursement1);
        
        ReimbursementData reimbursement2 = new ReimbursementData();
        reimbursement2.setEmployeeName("Jane Smith");
        reimbursement2.setEmployeeEmail("jane.smith@reimbursely.com");
        reimbursement2.setExpenseType("Office Supplies");
        reimbursement2.setAmount(new BigDecimal("250.00"));
        reimbursement2.setDescription("Printer cartridges and paper");
        reimbursement2.setExpenseDate(LocalDate.now().minusDays(3));
        reimbursement2.setStatus(ReimbursementStatus.APPROVED);
        reimbursement2.setApprovedBy("admin@reimbursely.com");
        reimbursement2.setApprovalDate(LocalDate.now().minusDays(1));
        reimbursement2.setUser(employee2);
        reimbursementDataRepository.save(reimbursement2);
        
        ReimbursementData reimbursement3 = new ReimbursementData();
        reimbursement3.setEmployeeName("John Doe");
        reimbursement3.setEmployeeEmail("john.doe@reimbursely.com");
        reimbursement3.setExpenseType("Meals");
        reimbursement3.setAmount(new BigDecimal("500.00"));
        reimbursement3.setDescription("Client lunch meeting");
        reimbursement3.setExpenseDate(LocalDate.now().minusDays(2));
        reimbursement3.setStatus(ReimbursementStatus.REJECTED);
        reimbursement3.setApprovedBy("admin@reimbursely.com");
        reimbursement3.setApprovalDate(LocalDate.now().minusDays(1));
        reimbursement3.setRejectionReason("Client meals are not covered under company policy");
        reimbursement3.setUser(employee1);
        reimbursementDataRepository.save(reimbursement3);
        
        System.out.println("Sample data initialized successfully!");
        System.out.println("Admin user: admin@reimbursely.com / Admin@123");
        System.out.println("Employee 1: john.doe@reimbursely.com / John@123");
        System.out.println("Employee 2: jane.smith@reimbursely.com / Jane@123");
    }
}

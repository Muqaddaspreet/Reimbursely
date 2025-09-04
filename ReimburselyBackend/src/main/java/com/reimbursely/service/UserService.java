package com.reimbursely.service;

import com.reimbursely.entity.User;
import com.reimbursely.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Create a new user
     */
    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }
        
        // Set default values
        if (user.getIsApprover() == null) {
            user.setIsApprover(0); // Default to employee
        }
        
        return userRepository.save(user);
    }
    
    /**
     * Get all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    /**
     * Get user by ID
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    /**
     * Get user by email
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Update user
     */
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        // Update fields
        user.setFullName(userDetails.getFullName());
        user.setPanNumber(userDetails.getPanNumber());
        user.setBank(userDetails.getBank());
        user.setBankAccountNumber(userDetails.getBankAccountNumber());
        
        return userRepository.save(user);
    }
    
    /**
     * Delete user
     */
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(user);
    }
    
    /**
     * Authenticate user (login)
     */
    public Optional<User> authenticateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
    
    /**
     * Check if email exists
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    
    /**
     * Get all admins
     */
    public List<User> getAllAdmins() {
        return userRepository.findAllAdmins();
    }
    
    /**
     * Get all employees
     */
    public List<User> getAllEmployees() {
        return userRepository.findAllEmployees();
    }
    
    /**
     * Change user role
     */
    public User changeUserRole(Long id, Integer isApprover) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        user.setIsApprover(isApprover);
        return userRepository.save(user);
    }
}

package com.reimbursely.repository;

import com.reimbursely.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);
    
    /**
     * Find users by approval status
     */
    List<User> findByIsApprover(Integer isApprover);
    
    /**
     * Find all admins (isApprover = 1)
     */
    @Query("SELECT u FROM User u WHERE u.isApprover = 1")
    List<User> findAllAdmins();
    
    /**
     * Find all employees (isApprover = 0)
     */
    @Query("SELECT u FROM User u WHERE u.isApprover = 0")
    List<User> findAllEmployees();
    
    /**
     * Find user by email and password (for login)
     */
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    Optional<User> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}

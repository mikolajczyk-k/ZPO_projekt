package com.nextbank.nextbank.repository;

import com.nextbank.nextbank.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    // Add custom query methods if needed
}


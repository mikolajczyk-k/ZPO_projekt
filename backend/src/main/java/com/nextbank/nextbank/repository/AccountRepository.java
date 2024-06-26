package com.nextbank.nextbank.repository;

import com.nextbank.nextbank.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByOwnerId(Long ownerId);

    @Query("SELECT a FROM Account a WHERE a.accountNumber = :accountNumber")
    Account findAccountByAccountNumber(String accountNumber);
}
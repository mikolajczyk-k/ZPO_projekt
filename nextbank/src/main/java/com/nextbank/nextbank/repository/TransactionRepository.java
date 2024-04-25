package com.nextbank.nextbank.repository;

import com.nextbank.nextbank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t WHERE (t.donor.id = :accountId OR t.recipient.id = :accountId) AND t.date >= :fromDate AND t.date <= :toDate")
    List<Transaction> findTransactionsByAccountIdAndDateRange(@Param("accountId") Long accountId, @Param("fromDate") LocalDateTime fromDate, @Param("toDate") LocalDateTime toDate);
    @Query("SELECT t FROM Transaction t WHERE (t.donor.owner.id = :clientId OR t.recipient.owner.id = :clientId) AND t.date >= :fromDate AND t.date <= :toDate")
    List<Transaction> findTransactionsByClientIdAndDateRange(@Param("clientId") Long clientId, @Param("fromDate") LocalDateTime fromDate, @Param("toDate") LocalDateTime toDate);

}
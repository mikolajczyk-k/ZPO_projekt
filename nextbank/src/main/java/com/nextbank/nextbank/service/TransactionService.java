package com.nextbank.nextbank.service;

import com.nextbank.nextbank.TransactionType;
import com.nextbank.nextbank.controller.TransactionController;
import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.model.Transaction;
import com.nextbank.nextbank.repository.AccountRepository;
import com.nextbank.nextbank.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    private final AccountRepository accountRepository;

    private final AccountService accountService;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository, AccountService accountService){
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    @Transactional
    public Transaction createTransaction(TransactionType type, BigDecimal amount, Long donorId, Long recipientId){
        Account donorAccount = null;
        Account recipientAccount = null;

        //donor not needed for deposit
        if (type == TransactionType.TRANSFER || type == TransactionType.WITHDRAWAL){
            donorAccount = accountRepository.findById(donorId).orElseThrow(() -> new IllegalArgumentException("Donor account not found."));

            if( donorAccount.getBalance().compareTo(amount) < 0){
                throw new IllegalArgumentException("Insufficient funds in donor account.");
            }
            donorAccount.setBalance(donorAccount.getBalance().subtract(amount));
            accountRepository.save(donorAccount);
        }
        //recipient not needed for withdrawal
        if (type == TransactionType.TRANSFER || type == TransactionType.DEPOSIT){
            recipientAccount = accountRepository.findById(recipientId).orElseThrow(() -> new IllegalArgumentException("Recipient account not found."));
            recipientAccount.setBalance(recipientAccount.getBalance().add(amount));
            accountRepository.save(recipientAccount);

        }

        Transaction transaction = new Transaction();
        transaction.setType(type);
        transaction.setDonor(donorAccount);
        transaction.setRecipient(recipientAccount);
        transaction.setAmount(amount);
        transaction.setDate(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }


    public List<Transaction> getTransactionsForAccount(Long accountId, LocalDate fromDate, LocalDate toDate){ //Dashboard Main

        LocalDateTime fromDateTime = fromDate.atStartOfDay();
        LocalDateTime toDateTime = (toDate != null ? toDate : LocalDate.now()).atTime(LocalTime.MAX);

        //getting and sorting transactions
        List<Transaction> transactions = transactionRepository.findTransactionsByAccountIdAndDateRange(accountId, fromDateTime, toDateTime);
        transactions.sort(Comparator.comparing(Transaction::getDate).reversed());

        return transactions;
    }




}

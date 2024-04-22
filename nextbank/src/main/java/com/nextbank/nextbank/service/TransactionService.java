package com.nextbank.nextbank.service;

import com.nextbank.nextbank.TransactionType;
import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.model.Transaction;
import com.nextbank.nextbank.repository.AccountRepository;
import com.nextbank.nextbank.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    private final AccountRepository accountRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository){
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
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


}

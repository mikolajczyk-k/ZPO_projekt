package com.nextbank.nextbank.service;

import com.nextbank.nextbank.model.Transaction;
import com.nextbank.nextbank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction getTransactionById(Long id){
        return transactionRepository.findById(id).orElse(null);
    }

}

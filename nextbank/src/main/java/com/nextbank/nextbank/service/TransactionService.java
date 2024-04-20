package com.nextbank.nextbank.service;

import com.nextbank.nextbank.model.Transaction;
import com.nextbank.nextbank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
}

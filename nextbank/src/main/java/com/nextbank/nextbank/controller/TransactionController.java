package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.TransactionType;
import com.nextbank.nextbank.dto.TransactionDTO;
import com.nextbank.nextbank.model.Transaction;
import com.nextbank.nextbank.repository.TransactionRepository;
import com.nextbank.nextbank.service.AccountService;
import com.nextbank.nextbank.service.TransactionService;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService;

    @Autowired
    public TransactionController(TransactionService transactionService, AccountService accountService){
        this.transactionService = transactionService;
        this.accountService = accountService;
    }

    @Getter
    @Setter
    public static class TransactionRequest{
        private TransactionType type;
        private BigDecimal amount;
        private Long donorId;
        private Long recipientId;
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequest request){
        Transaction newTransaction = transactionService.createTransaction(request.getType(), request.getAmount(), request.getDonorId(), request.getRecipientId());

        return ResponseEntity.ok(newTransaction);
    }
}

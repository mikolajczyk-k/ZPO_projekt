package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.repository.AccountRepository;
import com.nextbank.nextbank.service.AccountService;
import com.nextbank.nextbank.AccountType;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountRepository accountRepository;
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountRepository accountRepository, AccountService accountService){
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody AccountCreationRequest request){
        Account newAccount = accountService.createAccount(request.getClientId(), request.getType(), request.getInitialBalance());
        return ResponseEntity.ok(newAccount);
    }

    @Getter
    @Setter
    public static class AccountCreationRequest {
        private Long clientId;
        private AccountType type;
        private BigDecimal initialBalance;

        // Getters and Setters
    }
}

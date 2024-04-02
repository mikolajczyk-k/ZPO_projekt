package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.repository.AccountRepository;
import com.nextbank.nextbank.repository.ClientRepository;
import com.nextbank.nextbank.model.Client;

import com.nextbank.nextbank.service.AccountService;
import com.nextbank.nextbank.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id){
        Account account = accountService.getAccountById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Account> addAccount(@RequestBody Account account){
        Account savedAccount = accountService.saveAccount(account);
        return new ResponseEntity<>(savedAccount, HttpStatus.CREATED);
    }
}
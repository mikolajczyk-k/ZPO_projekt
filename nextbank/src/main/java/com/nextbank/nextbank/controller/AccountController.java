package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.repository.AccountRepository;
import com.nextbank.nextbank.service.AccountService;
import com.nextbank.nextbank.AccountType;
import com.nextbank.nextbank.dto.AccountDTO;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

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

    @Getter
    @Setter
    public static class AccountCreationRequest {
        private Long clientId;
        private AccountType type;
        private BigDecimal initialBalance;
    }



    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable Long id){
        Account account = accountService.getAccountById(id);

        if (account == null){
            return ResponseEntity.notFound().build();
        }

        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setType(account.getType());
        accountDTO.setAccountNumber(account.getAccountNumber());
        accountDTO.setBalance(account.getBalance());
        accountDTO.setOwnerId(account.getOwner().getId());


        return new ResponseEntity<>(accountDTO, HttpStatus.OK);
    }



    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody AccountCreationRequest request){
        Account newAccount = accountService.createAccount(request.getClientId(), request.getType(), request.getInitialBalance());
        return ResponseEntity.ok(newAccount);
    }




}
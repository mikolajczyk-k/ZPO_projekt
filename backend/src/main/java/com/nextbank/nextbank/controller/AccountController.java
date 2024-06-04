package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.IBANService;
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

    private final AccountService accountService;

    private final IBANService ibanService;



    @Autowired
    public AccountController(AccountService accountService, IBANService ibanService){
        this.accountService = accountService;
        this.ibanService = ibanService;
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
    public ResponseEntity<AccountDTO> createAccount(@RequestBody AccountCreationRequest request){
        Account newAccount = accountService.createAccount(request.getClientId(), request.getType(), request.getInitialBalance());
        String accountNumber =  ibanService.generateIBAN("XX");
        newAccount.setAccountNumber(accountNumber);
        newAccount = accountService.saveAccount(newAccount);

        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(newAccount.getId());
        accountDTO.setType(newAccount.getType());
        accountDTO.setAccountNumber(newAccount.getAccountNumber());
        accountDTO.setBalance(newAccount.getBalance());
        accountDTO.setOwnerId(newAccount.getOwner().getId());

        return ResponseEntity.ok(accountDTO);
    }

    @GetMapping("/getIdByAccountNumber/{accountNumber}")
    public ResponseEntity<Long> getIdByAccountNumber(@PathVariable String accountNumber){
        Account account = accountService.getAccountByAccountNumber(accountNumber);

        if(account == null){
            return ResponseEntity.ok(null);
        }
        else {
            Long accountId = account.getId();
            return ResponseEntity.ok(accountId);
        }
    }




}

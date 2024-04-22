package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.dto.AccountDTO;
import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.service.AccountService;

import com.nextbank.nextbank.model.Client;
import com.nextbank.nextbank.service.ClientService;
import com.nextbank.nextbank.repository.ClientRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/clients")
public class ClientController {


    private final ClientService clientService;

    private final AccountService accountService;

    @Autowired
    public ClientController(ClientService clientService, AccountService accountService){
        this.clientService = clientService;
        this.accountService = accountService;
    }

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.saveClient(client);
    }

    @GetMapping("/{ownerId}/accounts")
    public ResponseEntity<List<AccountDTO>> getAccountsByOwner(@PathVariable Long ownerId){
        List<Account> accounts = accountService.getAccountsByOwnerId(ownerId);
        List<AccountDTO> accountDTOS = accounts.stream().map(account -> {
            AccountDTO dto = new AccountDTO();
            dto.setId(account.getId());
            dto.setType(account.getType());
            dto.setAccountNumber(account.getAccountNumber());
            dto.setBalance(account.getBalance());
            dto.setOwnerId(account.getOwner().getId());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(accountDTOS);
    }


}

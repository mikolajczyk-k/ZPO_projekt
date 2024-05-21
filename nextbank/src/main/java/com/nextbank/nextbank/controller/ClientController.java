package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.dto.AuthResponse;
import com.nextbank.nextbank.dto.AccountDTO;
import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.service.AccountService;

import com.nextbank.nextbank.model.Client;
import com.nextbank.nextbank.service.ClientService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

    @GetMapping("/auth/{email}/{password}")
    public ResponseEntity<AuthResponse> getClientFromCredentials(@PathVariable("email") String email, @PathVariable("password") String password) {
        AuthResponse r = new AuthResponse();
        Client client = clientService.getClientByEmail(email);
        if (client != null) {
            r.setClientId(client.getId());
            if(password.equals(client.getPassword())){
                r.setSuccess(true);
            }
            else{
                r.setSuccess(false);
            }
        }
        else{
            r.setClientId(null);
            r.setSuccess(false);
        }
        return new ResponseEntity<>(r, HttpStatus.OK);
    }



}

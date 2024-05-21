package com.nextbank.nextbank.service;
import com.nextbank.nextbank.AccountType;
import com.nextbank.nextbank.model.Client;
import com.nextbank.nextbank.model.Transaction;
import com.nextbank.nextbank.model.Account;

import com.nextbank.nextbank.repository.AccountRepository;
import com.nextbank.nextbank.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {


    private final AccountRepository accountRepository;
    private final ClientRepository clientRepository;
    @Autowired
    public AccountService(AccountRepository accountRepository, ClientRepository clientRepository) {
        this.accountRepository = accountRepository;
        this.clientRepository = clientRepository;
    }

    public Account saveAccount(Account account){
        return accountRepository.save(account);
    }

    public Account getAccountById(Long id){
        return accountRepository.findById(id).orElse(null);
    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public List<Account> getAccountsByOwnerId(Long ownerId){
        return accountRepository.findByOwnerId(ownerId);
    }


    public Account createAccount(Long clientId, AccountType type, BigDecimal initialBalance){
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (!clientOptional.isPresent()) {
            throw new IllegalArgumentException("Client with ID " + clientId + " does not exist.");
        }

        Client client = clientOptional.get();
        Account newAccount = new Account();
        newAccount.setType(type);
        newAccount.setBalance(initialBalance != null ? initialBalance : BigDecimal.valueOf(0));
        newAccount.setOwner(client);

        return accountRepository.save(newAccount);
    }


}

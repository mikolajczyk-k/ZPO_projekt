package com.nextbank.nextbank.service;

import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Account saveAccount(Account account){
        return accountRepository.save(account);
    }

    public Account getAccountById(Long id){
        return accountRepository.findById(id).orElse(null);
    }


}

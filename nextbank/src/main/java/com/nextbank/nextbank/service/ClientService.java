package com.nextbank.nextbank.service;

import com.nextbank.nextbank.model.Client;
import com.nextbank.nextbank.repository.ClientRepository;

import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ClientService {

    @Autowired
    private final ClientRepository clientRepository;

    @Autowired
    private final AccountRepository accountRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository, AccountRepository accountRepository) {
        this.clientRepository = clientRepository;
        this.accountRepository = accountRepository;
    }

    public Client saveClient(Client client) {
        // Create the client
        Client savedClient = clientRepository.save(client);

        // Associate accounts with the client
        List<Account> accounts = client.getAccounts();
        if (accounts != null && !accounts.isEmpty()) {
            for (Account account : accounts) {
                account.getOwners().add(savedClient);
                accountRepository.save(account);
            }


        }
        return savedClient;
    }

        public Client getClientById(Long id){
            return clientRepository.findById(id).orElse(null);
        }

        public List<Client> getAllClients(){
            return clientRepository.findAll();
        }

}

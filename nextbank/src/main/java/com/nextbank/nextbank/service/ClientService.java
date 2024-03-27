package com.nextbank.nextbank.service;

import com.nextbank.nextbank.model.Client;
import com.nextbank.nextbank.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client saveClient(Client client){
        return clientRepository.save(client);
    }

    public Client getClientById(Long id){
        return clientRepository.findById(id).orElse(null);
    }

}

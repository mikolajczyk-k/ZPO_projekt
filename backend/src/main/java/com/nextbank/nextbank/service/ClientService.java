package com.nextbank.nextbank.service;

import com.nextbank.nextbank.dto.AuthResponse;
import com.nextbank.nextbank.model.Client;
import com.nextbank.nextbank.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }


    public Client getClientById(Long id){
        return clientRepository.findById(id).orElse(null);
    }

    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    public Client saveClient(Client client){
        return clientRepository.save(client);
    }

    public Client getClientByEmail(String email) {
        return clientRepository.findClientByEmail(email);
    }



}

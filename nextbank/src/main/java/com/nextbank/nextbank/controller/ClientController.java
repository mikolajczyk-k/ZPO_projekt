package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.model.Client;
import com.nextbank.nextbank.service.ClientService;
import com.nextbank.nextbank.repository.ClientRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
public class ClientController {


    private final ClientRepository clientRepository;
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientRepository clientRepository, ClientService clientService){
        this.clientRepository = clientRepository;
        this.clientService = clientService;
    }

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.saveClient(client);
    }


}

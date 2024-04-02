package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.repository.ClientRepository;
import com.nextbank.nextbank.model.Client;

import com.nextbank.nextbank.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientRepository clientRepository;
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientRepository clientRepository, ClientService clientService) {
        this.clientRepository = clientRepository;
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id){
        Client client = clientService.getClientById(id);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Client> addClient(@RequestBody Client client){
        Client savedClient = clientService.saveClient(client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }
}

package com.nextbank.nextbank.controller;

import com.nextbank.nextbank.TransactionType;
import com.nextbank.nextbank.dto.AccountDTO;
import com.nextbank.nextbank.dto.TransactionDTO;
import com.nextbank.nextbank.model.Account;
import com.nextbank.nextbank.model.Transaction;
import com.nextbank.nextbank.repository.TransactionRepository;
import com.nextbank.nextbank.service.AccountService;
import com.nextbank.nextbank.service.TransactionService;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService;

    @Autowired
    public TransactionController(TransactionService transactionService, AccountService accountService){
        this.transactionService = transactionService;
        this.accountService = accountService;
    }

    @Getter
    @Setter
    public static class TransactionRequest{
        private TransactionType type;
        private BigDecimal amount;
        private Long donorId;
        private Long recipientId;
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(@RequestBody TransactionRequest request){
        Transaction transaction = transactionService.createTransaction(request.getType(), request.getAmount(), request.getDonorId(), request.getRecipientId());
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setType(transaction.getType());
        dto.setAmount(transaction.getAmount());
        dto.setDonorId(transaction.getDonor() != null ? transaction.getDonor().getId() : null);
        dto.setRecipientId(transaction.getRecipient() != null ? transaction.getRecipient().getId() : null);
        dto.setDate(transaction.getDate());


        return ResponseEntity.ok(dto);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsForAccount(
            @PathVariable Long accountId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate){

        List<Transaction> transactions = transactionService.getTransactionsForAccount(accountId, fromDate, toDate);
        List<TransactionDTO> transactionsDTOS = transactions.stream().map(transaction -> {

            TransactionDTO dto = new TransactionDTO();
            dto.setId(transaction.getId());
            dto.setType(transaction.getType());
            dto.setAmount(transaction.getAmount());
            dto.setDonorId(transaction.getDonor() != null ? transaction.getDonor().getId() : null);
            dto.setRecipientId(transaction.getRecipient() != null ? transaction.getRecipient().getId() : null);
            dto.setDate(transaction.getDate());

            return dto;
        }).toList();

        return ResponseEntity.ok(transactionsDTOS);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsForClient(
            @PathVariable Long clientId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate){

            List<Transaction> transactions = transactionService.getTransactionsForClient(clientId, fromDate, toDate);
            List<TransactionDTO> transactionsDTOS = transactions.stream().map(transaction -> {

                TransactionDTO dto = new TransactionDTO();
                dto.setId(transaction.getId());
                dto.setType(transaction.getType());
                dto.setAmount(transaction.getAmount());
                dto.setDonorId(transaction.getDonor() != null ? transaction.getDonor().getOwner().getId() : null);
                dto.setRecipientId(transaction.getRecipient() != null ? transaction.getRecipient().getOwner().getId() : null);
                dto.setDate(transaction.getDate());

                return dto;
            }).toList();

        return ResponseEntity.ok(transactionsDTOS);
    }
}

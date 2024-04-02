package com.nextbank.nextbank.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;


@Setter
@Getter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ACCOUNT")
public class Account {
    public enum accountType{
        CHECKING,
        SAVINGS,

        CD,
        MMA
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private accountType type;

    private String accountNumber;

    private String IBAN;


    private BigDecimal balance;

    @OneToMany(mappedBy = "donor")
    private List<Transaction> outgoingTransactions;

    @OneToMany(mappedBy = "recipient")
    private List<Transaction> incomingTransactions;


    @ManyToMany(mappedBy = "accounts", fetch = FetchType.LAZY)
    private Set<Client> owners;

}
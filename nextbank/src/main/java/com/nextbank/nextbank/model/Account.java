package com.nextbank.nextbank.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;





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

    @ManyToMany
    @JoinTable(name = "account_client",
                joinColumns = @JoinColumn(name= "account_id"),
                inverseJoinColumns = @JoinColumn(name = "client_id"))
    private List<Client> owners;

    private BigDecimal balance;

    @OneToMany(mappedBy = "donor")
    private List<Transaction> outgoingTransactions;

    @OneToMany(mappedBy = "recipient")
    private List<Transaction> incomingTransactions;

}
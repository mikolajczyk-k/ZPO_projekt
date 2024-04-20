package com.nextbank.nextbank.model;

import com.nextbank.nextbank.AccountType;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private AccountType type;

    @Column(unique = true)
    private String accountNumber;

    private BigDecimal balance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client owner;
}

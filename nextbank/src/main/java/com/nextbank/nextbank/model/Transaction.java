package com.nextbank.nextbank.model;

import com.nextbank.nextbank.TransactionType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_account_id")
    private Account donor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_account_id")
    private Account recipient;

    private LocalDateTime date;
}

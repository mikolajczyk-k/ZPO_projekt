package com.nextbank.nextbank;

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
    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Account donor;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private Account recipient;

    private BigDecimal amount;

    private LocalDateTime time;
}

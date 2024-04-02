package com.nextbank.nextbank.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "TRANSACTION")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor")
    private Account donor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient")
    private Account recipient;

    private BigDecimal amount;

    private LocalDateTime time;
}

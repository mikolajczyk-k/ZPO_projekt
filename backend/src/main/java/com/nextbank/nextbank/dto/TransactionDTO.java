package com.nextbank.nextbank.dto;

import com.nextbank.nextbank.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private Long id;
    private TransactionType type;
    private BigDecimal amount;
    private Long donorId;
    private Long recipientId;
    private LocalDateTime date;
}

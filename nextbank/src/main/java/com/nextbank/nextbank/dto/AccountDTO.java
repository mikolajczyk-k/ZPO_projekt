package com.nextbank.nextbank.dto;

import com.nextbank.nextbank.AccountType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Long id;
    private AccountType type;
    private String accountNumber;
    private BigDecimal balance;
    private Long ownerId;

}
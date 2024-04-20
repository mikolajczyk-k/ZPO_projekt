package com.nextbank.nextbank.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lastName;
    private String firstName;

    @Column(columnDefinition = "DATE")
    private LocalDate dateOfBirth;


    @Column(unique = true)
    private String PESEL;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Account> accounts;

}

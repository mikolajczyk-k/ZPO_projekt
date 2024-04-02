package com.nextbank.nextbank.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Setter
@Getter@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "CLIENT")
public class Client {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lastName;
    private String firstName;
    private String PESEL;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "CLIENTS_ACCOUNTS",
    joinColumns = {
            @JoinColumn(name = "client_id", referencedColumnName = "id")
    },
    inverseJoinColumns = {
            @JoinColumn(name = "account_id", referencedColumnName = "id")
    })
    private List<Account> accounts;

}

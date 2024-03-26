package com.nextbank.nextbank;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Setter
@Getter@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
}

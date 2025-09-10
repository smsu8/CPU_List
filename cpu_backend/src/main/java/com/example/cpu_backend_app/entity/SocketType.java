package com.example.cpu_backend_app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "socket_types")
public class SocketType {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

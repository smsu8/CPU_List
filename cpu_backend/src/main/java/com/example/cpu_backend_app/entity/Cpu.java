package com.example.cpu_backend_app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cpus")
public class Cpu {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false) private String brand;
    @Column(nullable=false) private String model;

    @ManyToOne
    @JoinColumn(name="socket_id", nullable=false)
    private SocketType socket;

    @Column(name="clock_speed_mhz", nullable=false) private Integer clockSpeed;
    @Column(nullable=false) private Integer cores;
    @Column(nullable=false) private Integer threads;
    @Column(name="tdp_watts", nullable=false) private Integer tdp;
    @Column(name="price_eur", nullable=false) private Double price;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public SocketType getSocket() { return socket; }
    public void setSocket(SocketType socket) { this.socket = socket; }
    public Integer getClockSpeed() { return clockSpeed; }
    public void setClockSpeed(Integer clockSpeed) { this.clockSpeed = clockSpeed; }
    public Integer getCores() { return cores; }
    public void setCores(Integer cores) { this.cores = cores; }
    public Integer getThreads() { return threads; }
    public void setThreads(Integer threads) { this.threads = threads; }
    public Integer getTdp() { return tdp; }
    public void setTdp(Integer tdp) { this.tdp = tdp; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}

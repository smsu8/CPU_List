package com.example.cpu_backend_app.repository;

import com.example.cpu_backend_app.entity.Cpu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CpuRepository extends JpaRepository<Cpu, Long> {}

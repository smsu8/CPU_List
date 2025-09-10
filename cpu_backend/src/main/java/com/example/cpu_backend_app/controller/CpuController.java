package com.example.cpu_backend_app.controll;

import com.example.cpu_backend_app.entity.Cpu;
import com.example.cpu_backend_app.entity.SocketType;
import com.example.cpu_backend_app.repository.CpuRepository;
import com.example.cpu_backend_app.repository.SocketTypeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
public class CpuController {

    private final CpuRepository cpuRepo;
    private final SocketTypeRepository socketRepo;

    public CpuController(CpuRepository cpuRepo, SocketTypeRepository socketRepo) {
        this.cpuRepo = cpuRepo;
        this.socketRepo = socketRepo;
    }

    @GetMapping("/cpus")
    public List<Cpu> getAllCpus() { return cpuRepo.findAll(); }

    @GetMapping("/cpus/{id}")
    public Cpu getCpu(@PathVariable Long id) {
        return cpuRepo.findById(id).orElseThrow(() -> new RuntimeException("CPU " + id + " not found"));
    }

    @PostMapping("/cpus")
    public Cpu createCpu(@RequestBody Cpu cpu) {
        SocketType socket = socketRepo.findById(cpu.getSocket().getId())
                .orElseThrow(() -> new RuntimeException("Socket not found"));
        cpu.setSocket(socket);
        return cpuRepo.save(cpu);
    }

    @PutMapping("/cpus/{id}")
    public Cpu updateCpu(@PathVariable Long id, @RequestBody Cpu updated) {
        Cpu existing = cpuRepo.findById(id).orElseThrow(() -> new RuntimeException("CPU " + id + " not found"));
        SocketType socket = socketRepo.findById(updated.getSocket().getId())
                .orElseThrow(() -> new RuntimeException("Socket not found"));
        existing.setBrand(updated.getBrand());
        existing.setModel(updated.getModel());
        existing.setSocket(socket);
        existing.setClockSpeed(updated.getClockSpeed());
        existing.setCores(updated.getCores());
        existing.setThreads(updated.getThreads());
        existing.setTdp(updated.getTdp());
        existing.setPrice(updated.getPrice());
        return cpuRepo.save(existing);
    }

    @DeleteMapping("/cpus/{id}")
    public void deleteCpu(@PathVariable Long id) { cpuRepo.deleteById(id); }

    @GetMapping("/sockets")
    public List<SocketType> getSockets() { return socketRepo.findAll(); }

    
}

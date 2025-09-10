import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCpuById, createCpu, updateCpu, getSockets } from '../services/api';


const BRAND_OPTIONS = [
  'Intel', 'AMD', 'Apple', 'Qualcomm', 'Samsung', 'MediaTek',
  'IBM', 'NVIDIA', 'HiSilicon', 'VIA'
];

const MODEL_HINTS = [
  'Ryzen 5 5600', 'Ryzen 7 5800X', 'Ryzen 5 7600', 'Ryzen 7 7700X',
  'Core i5-12400F', 'Core i7-12700K', 'Core i5-13600K', 'Core i9-12900K'
];

const CORE_OPTIONS   = [2, 4, 6, 8, 12, 16, 24];
const THREAD_OPTIONS = [2, 4, 8, 12, 16, 20, 24, 32];

function CpuDetail() {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const isNew = !idParam || (typeof idParam === 'string' && idParam.toLowerCase() === 'new');

  const [cpu, setCpu] = useState({
    brand: '',
    model: '',
    socket: { id: '' },
    clockSpeed: 800,
    cores: 2,
    threads: 4,
    tdp: 20,
    price: 0
  });

  const [sockets, setSockets] = useState([]);
  const [loading, setLoading] = useState(!isNew);

  const fetchSockets = useCallback(async () => {
    try {
      const res = await getSockets();
      setSockets(res.data || []);
    } catch (e) {
      console.error('Error loading sockets', e);
    }
  }, []);

  const fetchCpu = useCallback(async () => {
    try {
      const res = await getCpuById(idParam);
      const data = res.data;
    
      setCpu({
        ...data,
        clockSpeed: Number(data.clockSpeed ?? 0),
        cores: Number(data.cores ?? 1),
        threads: Number(data.threads ?? 1),
        tdp: Number(data.tdp ?? 10),
        price: Number(data.price ?? 0),
        socket: data.socket ?? { id: '' }
      });
    } catch (e) {
      console.error('Error loading CPU', e);
    } finally {
      setLoading(false);
    }
  }, [idParam]);

  useEffect(() => {
    fetchSockets();
    if (!isNew) fetchCpu();
    else setLoading(false);
  }, [fetchSockets, fetchCpu, isNew]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsed = type === 'number' ? (value === '' ? '' : Number(value)) : value;

    setCpu((prev) => {
      const next = { ...prev, [name]: parsed };
      
      if (name === 'cores') {
        const coercedThreads = Math.max(Number(next.threads || 0), Number(parsed || 1));
        next.threads = coercedThreads;
      }
      return next;
    });
  };

  const handleSocketChange = (e) => {
    const socketId = parseInt(e.target.value, 10);
    const sel = sockets.find((s) => s.id === socketId);
    setCpu((prev) => ({ ...prev, socket: sel || { id: socketId } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!cpu.brand) return alert('Bitte eine Brand auswählen.');
    if (!cpu.model) return alert('Bitte ein Model eingeben.');
    if (!cpu.socket?.id) return alert('Bitte einen Socket wählen.');
    if ((cpu.threads || 0) < (cpu.cores || 0)) {
      return alert('Threads dürfen nicht kleiner als Cores sein.');
    }

    try {
      if (isNew) {
        await createCpu(cpu); 
      } else {
        if (!idParam || idParam === 'undefined') {
          alert('Interner Fehler: ID fehlt.');
          return;
        }
        await updateCpu(idParam, cpu); 
      }
      navigate('/');
    } catch (err) {
      console.error('Save error', err);
      alert('Speichern fehlgeschlagen. Details in der Konsole.');
    }
  };

  if (loading) return <div>Loading CPU details...</div>;

  return (
    <div>
      <h2>{isNew ? 'Add New CPU' : 'Edit CPU'}</h2>
      <form onSubmit={handleSubmit}>
        {/* BRAND: Dropdown */}
        <div className="form-group">
          <label>Brand</label>
          <select
            className="form-control"
            name="brand"
            value={cpu.brand}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a brand --</option>
            {BRAND_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* MODEL: Freitext + datalist Vorschläge */}
        <div className="form-group">
          <label>Model</label>
          <input
            className="form-control"
            name="model"
            value={cpu.model}
            onChange={handleChange}
            list="modelHints"
            placeholder="e.g. Ryzen 5 5600"
            required
          />
          <datalist id="modelHints">
            {MODEL_HINTS.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </div>

        {/* SOCKET: aus DB */}
        <div className="form-group">
          <label>Socket</label>
          <select
            className="form-control"
            value={cpu.socket?.id || ''}
            onChange={handleSocketChange}
            required
          >
            <option value="">Select a socket</option>
            {sockets.map((s) => (
              <option key={s.id} value={s.id.toString()}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* CLOCK SPEED */}
        <div className="form-group">
          <label>Clock Speed (MHz)</label>
          <input
            type="number"
            name="clockSpeed"
            min="800"
            className="form-control"
            value={cpu.clockSpeed}
            onChange={handleChange}
            required
          />
        </div>

        {/* CORES: Dropdown */}
        <div className="form-group">
          <label>Cores</label>
          <select
            className="form-control"
            name="cores"
            value={cpu.cores}
            onChange={handleChange}
            required
          >
            {CORE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* THREADS: Dropdown (nur Optionen >= cores) */}
        <div className="form-group">
          <label>Threads</label>
          <select
            className="form-control"
            name="threads"
            value={cpu.threads}
            onChange={handleChange}
            required
          >
            {THREAD_OPTIONS
              .filter((n) => n >= (cpu.cores || 1))
              .map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
          </select>
        </div>

        {/* TDP */}
        <div className="form-group">
          <label>TDP (W) </label>
          <input
            type="number"
            name="tdp"
            min="10"
            className="form-control"
            value={cpu.tdp}
            onChange={handleChange}
            required
          />
        </div>

        {/* PRICE */}
        <div className="form-group">
          <label>Price (€)</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            className="form-control"
            value={cpu.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default CpuDetail;

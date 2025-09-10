import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCpus, deleteCpu } from '../services/api';

function CpuList() {
  const [cpus, setCpus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCpus();
        setCpus(res.data);
      } catch (e) {
        console.error('API error', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <style>{`.row:hover{background:#f5f5f5}.row:active{background:#e9e9e9}`}</style>
      <h2>CPU List</h2>
      <button className="btn btn-primary" onClick={() => navigate('/cpus/new')}>Add CPU</button>
      {cpus.length === 0 ? (
        <div>No CPUs found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Socket</th>
              <th>C/T</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cpus.map(cpu => (
              <tr key={cpu.id} className="row" style={{cursor:'pointer'}}>
                <td onClick={()=>navigate(`/cpus/${cpu.id}`)}>{cpu.brand}</td>
                <td onClick={()=>navigate(`/cpus/${cpu.id}`)}>{cpu.model}</td>
                <td onClick={()=>navigate(`/cpus/${cpu.id}`)}>{cpu.socket?.name}</td>
                <td onClick={()=>navigate(`/cpus/${cpu.id}`)}>{cpu.cores}/{cpu.threads}</td>
                <td onClick={()=>navigate(`/cpus/${cpu.id}`)}>{cpu.price}€</td>
                <td>
                  <button className="btn btn-danger" onClick={async (e)=>{
                    e.stopPropagation();
                    await deleteCpu(cpu.id);
                    setCpus(cur => cur.filter(x=>x.id!==cpu.id));
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default CpuList;

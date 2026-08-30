import { Home, Plus, Users } from 'lucide-react';
import React, { useState } from 'react';

export default function HouseholdModule() {
  const [households, setHouseholds] = useState([]);
  const [name, setName] = useState('');
  const [membersCount, setMembersCount] = useState('');
  const [productiveActivity, setProductiveActivity] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    setHouseholds([...households, { id: Date.now(), name, membersCount, productiveActivity }]);
    setName('');
    setMembersCount('');
    setProductiveActivity('');
  };

  return (
    <div className="glass-panel p-6 rounded-2xl my-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-salta-sand">
        <Home className="text-salta-earth" /> Ficha de Unidad Doméstica / Hogar o Entidad
      </h3>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input 
          type="text" 
          placeholder="Nombre del Hogar / Familia / Entidad" 
          required
          className="glass-input px-3 py-2 rounded-xl text-sm"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Nº Integrantes" 
          required
          className="glass-input px-3 py-2 rounded-xl text-sm"
          value={membersCount}
          onChange={e => setMembersCount(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Unidad Productiva / Actividad" 
          required
          className="glass-input px-3 py-2 rounded-xl text-sm"
          value={productiveActivity}
          onChange={e => setProductiveActivity(e.target.value)}
        />
        <button type="submit" className="bg-salta-earth hover:bg-amber-700 text-white rounded-xl font-semibold px-4 py-2 text-sm flex items-center justify-center gap-1 transition">
          <Plus className="w-4 h-4" /> Agregar Ficha
        </button>
      </form>

      {households.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="p-2">Hogar / Entidad</th>
                <th className="p-2">Integrantes</th>
                <th className="p-2">Actividad Productiva</th>
              </tr>
            </thead>
            <tbody>
              {households.map(h => (
                <tr key={h.id} className="border-b border-white/5 hover:bg-slate-800/30">
                  <td className="p-2 font-semibold text-white">{h.name}</td>
                  <td className="p-2 text-amber-300">{h.membersCount}</td>
                  <td className="p-2 text-slate-300">{h.productiveActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
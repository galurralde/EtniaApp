import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';

export default function NewProjectModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [theoreticalFramework, setTheoreticalFramework] = useState('');
  const [entityType, setEntityType] = useState('Pueblo Originario');
  const [authorizedEmails, setAuthorizedEmails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      title,
      location,
      theoreticalFramework,
      entityType,
      authorizedEmails: authorizedEmails.split(',').map(e => e.trim()),
      createdAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-salta-sand flex items-center gap-2">
          <Plus className="text-salta-earth" /> Nuevo Trabajo Etnográfico
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Título del Proyecto</label>
            <input 
              type="text" 
              required
              placeholder="Ej. Cerdo Negro - Finca La Montanera / Comunidad Kolla Santa Victoria"
              className="w-full glass-input px-4 py-2 rounded-xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Ubicación de Campo</label>
              <input 
                type="text" 
                required
                placeholder="Ej. Cerrillos / Valle de Lerma / Valles Calchaquíes"
                className="w-full glass-input px-4 py-2 rounded-xl"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Tipo de Entidad / Sujeto (Obligatorio)
              </label>
              <select 
                className="w-full glass-input px-4 py-2 rounded-xl bg-slate-900 text-white"
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
              >
                <option value="Pueblo Originario">Pueblo Originario / Comunidad</option>
                <option value="Entidad Privada">Entidad Privada (Empresas, Fincas)</option>
                <option value="Entidad Pública">Entidad Pública / Estatal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Marco Teórico / Problema de Investigación</label>
            <textarea 
              rows={3}
              placeholder="Describa los objetivos generales y enfoque disciplinar..."
              className="w-full glass-input px-4 py-2 rounded-xl"
              value={theoreticalFramework}
              onChange={(e) => setTheoreticalFramework(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Correos Autorizados (separados por coma)</label>
            <input 
              type="text" 
              placeholder="director@unsa.edu.ar, etnografia@gmail.com"
              className="w-full glass-input px-4 py-2 rounded-xl"
              value={authorizedEmails}
              onChange={(e) => setAuthorizedEmails(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-salta-earth hover:bg-amber-700 text-white font-semibold transition shadow-lg">
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
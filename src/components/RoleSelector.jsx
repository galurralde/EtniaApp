import { BookOpen, ClipboardList, Eye, Mic, Scale } from 'lucide-react';

import React from 'react';

const ROLES = [
  { id: 'A', name: 'Observador Participante', icon: Eye, desc: 'Mapeo espacial/comportamental y flujos no verbales' },
  { id: 'B', name: 'Entrevistador Etnográfico', icon: Mic, desc: 'Historias de vida, guiones dinámicos y audio' },
  { id: 'C', name: 'Encuestador', icon: ClipboardList, desc: 'Captura rápida de encuestas estructuradas (Escalas 1-5)' },
  { id: 'D', name: 'Diario Tripartito', icon: BookOpen, desc: 'Registro descriptivo, emic/etic y diario reflexivo' },
  { id: 'E', name: 'Coordinador Ético', icon: Scale, desc: 'Triangulación de fuentes y verificación CLPI' }
];

export default function RoleSelector({ activeRoles, onToggleRole }) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-bold mb-3 text-salta-sand">Roles Etnográficos Activos para la Sesión:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isActive = activeRoles.includes(role.id);
          return (
            <button
              key={role.id}
              onClick={() => onToggleRole(role.id)}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isActive 
                  ? 'bg-salta-earth/40 border-salta-earth ring-2 ring-salta-earth/60 shadow-lg' 
                  : 'glass-panel hover:bg-slate-800/50 border-white/10'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Icon className={`w-6 h-6 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${isActive ? 'bg-amber-400 text-slate-900' : 'bg-slate-700 text-slate-300'}`}>
                    Rol {role.id}
                  </span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{role.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{role.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
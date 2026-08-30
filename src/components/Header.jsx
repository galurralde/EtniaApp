import { Folder, LogOut, ShieldCheck, Users } from 'lucide-react';

import React from 'react';

export default function Header({ user, activeProject, activeRoles, onLogout }) {
  return (
    <header className="glass-panel sticky top-0 z-50 px-6 py-4 mb-6 rounded-b-2xl border-b border-white/10 flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-salta-red flex items-center justify-center font-bold text-xl shadow-lg border border-white/20">
          E
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide text-white">EtniaApp <span className="text-salta-earth font-light">| Salta</span></h1>
          <p className="text-xs text-slate-300">Sistema Universitario de Etnografía Digital</p>
        </div>
      </div>

      {/* Indicadores Persistentes */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {activeProject ? (
          <>
            <div className="flex items-center space-x-1 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <Folder className="w-4 h-4 text-salta-earth" />
              <span className="text-slate-400">Proyecto:</span>
              <span className="font-semibold text-white">{activeProject.title}</span>
            </div>
            <div className="flex items-center space-x-1 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Sujeto:</span>
              <span className="font-semibold text-emerald-300">{activeProject.entityType}</span>
            </div>
            <div className="flex items-center space-x-1 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Roles:</span>
              <span className="font-semibold text-amber-300">
                {activeRoles.length > 0 ? activeRoles.join(', ') : 'Ninguno'}
              </span>
            </div>
          </>
        ) : (
          <div className="text-slate-400 italic">Seleccione un proyecto para comenzar</div>
        )}
      </div>

      {user && (
        <div className="flex items-center space-x-3">
          <img src={user.photoURL || 'https://via.placeholder.com/40'} alt="Avatar" className="w-8 h-8 rounded-full border border-salta-earth" />
          <span className="text-sm font-medium hidden sm:inline">{user.displayName || user.email}</span>
          <button onClick={onLogout} title="Cerrar Sesión" className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
}
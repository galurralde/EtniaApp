import { FolderOpen, LogIn, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import { loginWithGoogle, logout } from './firebase';

import EthicalModule from './components/EthicalModule';
import ExportModule from './components/ExportModule';
import Header from './components/Header';
import HouseholdModule from './components/HouseholdModule';
import NewProjectModal from './components/NewProjectModal';
import RoleSelector from './components/RoleSelector';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeRoles, setActiveRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsList, setProjectsList] = useState([]);

  const handleLogin = async () => {
    try {
      const u = await loginWithGoogle();
      setUser(u);
    } catch (err) {
      alert("Error en login: " + err.message);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setActiveProject(null);
  };

  const handleCreateProject = (projectData) => {
    const newProj = { ...projectData, id: Date.now() };
    setProjectsList([...projectsList, newProj]);
    setActiveProject(newProj);
  };

  const handleToggleRole = (roleId) => {
    if (activeRoles.includes(roleId)) {
      setActiveRoles(activeRoles.filter(r => r !== roleId));
    } else {
      setActiveRoles([...activeRoles, roleId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
      <Header 
        user={user} 
        activeProject={activeProject} 
        activeRoles={activeRoles} 
        onLogout={handleLogout} 
      />

      {!user ? (
        <div className="glass-panel p-8 max-w-md mx-auto my-16 rounded-3xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-2 text-white">EtniaApp Salta</h2>
          <p className="text-slate-300 text-sm mb-6">Plataforma Universitaria de Etnografía Digital en Territorio</p>
          <button 
            onClick={handleLogin}
            className="w-full py-3 px-6 bg-salta-earth hover:bg-amber-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-3 transition shadow-lg"
          >
            <LogIn className="w-5 h-5" /> Iniciar Sesión con Google
          </button>
        </div>
      ) : (
        <main>
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Proyectos Etnográficos</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-salta-earth hover:bg-amber-700 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-lg text-sm"
            >
              <PlusCircle className="w-5 h-5" /> Nuevo Trabajo Etnográfico
            </button>
          </div>

          {projectsList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {projectsList.map(proj => (
                <div 
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`p-4 rounded-xl cursor-pointer border transition ${
                    activeProject?.id === proj.id ? 'glass-panel border-salta-earth ring-2 ring-salta-earth/50' : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FolderOpen className="w-5 h-5 text-salta-earth" />
                    <h3 className="font-bold text-sm truncate">{proj.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400">{proj.location} • <span className="text-amber-300">{proj.entityType}</span></p>
                </div>
              ))}
            </div>
          )}

          {activeProject ? (
            <>
              <EthicalModule project={activeProject} />
              <RoleSelector activeRoles={activeRoles} onToggleRole={handleToggleRole} />
              <HouseholdModule />
              <ExportModule projectData={{ ...activeProject, activeRoles }} />
            </>
          ) : (
            <div className="glass-panel p-12 text-center rounded-2xl my-8 text-slate-400">
              <p>Selecciona o crea un proyecto etnográfico para iniciar la recolección de campo.</p>
            </div>
          )}
        </main>
      )}

      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateProject}
      />
    </div>
  );
}
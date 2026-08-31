import { Loader2, Plus, X } from 'lucide-react';
import { appendProjectToSheet, createProjectFolder } from '../utils/gdrive';

import { useState } from 'react';

export default function NewProjectModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [theoreticalFramework, setTheoreticalFramework] = useState('');
  const [entityType, setEntityType] = useState('Pueblo Originario');
  const [authorizedEmails, setAuthorizedEmails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const projectData = {
        title,
        location,
        theoreticalFramework,
        entityType,
        authorizedEmails: authorizedEmails ? authorizedEmails.split(',').map(e => e.trim()) : [],
        createdAt: new Date().toISOString()
      };

      let folderId = null;

      // 1. Crear carpeta en Google Drive para este proyecto
      try {
        folderId = await createProjectFolder(title);
        projectData.driveFolderId = folderId;
      } catch (driveErr) {
        console.warn("No se pudo crear la carpeta en Drive:", driveErr.message);
        // Continúa la ejecución si no hay token de Drive activo
      }

      // 2. Insertar fila en Google Sheets
      if (folderId) {
        try {
          await appendProjectToSheet(projectData, folderId);
        } catch (sheetErr) {
          console.warn("No se pudo registrar en Google Sheets:", sheetErr.message);
        }
      }

      // 3. Pasar el proyecto creado al estado principal de la app
      onCreate(projectData);

      // Limpiar campos y cerrar modal
      setTitle('');
      setLocation('');
      setTheoreticalFramework('');
      setAuthorizedEmails('');
      onClose();

    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      alert("Ocurrió un error al procesar el proyecto: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-white disabled:opacity-50"
        >
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
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2 rounded-xl bg-salta-earth hover:bg-amber-700 text-white font-semibold transition shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando Carpeta y Registro...
                </>
              ) : (
                "Crear Proyecto"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
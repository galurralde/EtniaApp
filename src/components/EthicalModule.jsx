import { CloudUpload, FileCheck, ShieldAlert, SquareCheckBig } from 'lucide-react';

import { uploadFileToDrive } from '../utils/gdrive';
import { useState } from 'react';

export default function EthicalModule({ project }) {
  const isCommunity = project?.entityType === 'Pueblo Originario';
  const [uploading, setUploading] = useState(false);
  const [driveUrl, setDriveUrl] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadFileToDrive(file);
      setDriveUrl(`https://drive.google.com/file/d/${res.id}/view`);
      alert("Documento ético subido exitosamente a Google Drive");
    } catch (err) {
      alert("Error al subir a Google Drive: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-l-4 border-amber-500 my-6">
      <div className="flex items-center gap-3 mb-4">
        <ShieldAlert className="w-7 h-7 text-amber-400" />
        <div>
          <h3 className="text-lg font-bold">Protocolo Ético de Campo Activo</h3>
          <p className="text-xs text-slate-300">
            {isCommunity ? "Normativa CLPI - Convenio 169 OIT / Derechos Colectivos" : "Consentimiento Informado Estándar & Propiedad Intelectual"}
          </p>
        </div>
      </div>

      {isCommunity ? (
        /* Protocolo CLPI para Comunidades Originarias */
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-amber-500/30">
            <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5" /> Checklist CLPI (Consentimiento Libre, Previo e Informado)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded accent-salta-earth" />
                <span>Consulta previa a Autoridades / Asamblea Comunitarias</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded accent-salta-earth" />
                <span>Registro de reuniones traducidas / Lengua originaria</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded accent-salta-earth" />
                <span>Información exhaustiva de impactos y metodología</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded accent-salta-earth" />
                <span>Exclusividad de beneficios compartidos</span>
              </label>
            </div>
          </div>
        </div>
      ) : (
        /* Protocolo Estándar para Entidades Públicas/Privadas */
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-blue-500/30">
            <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5" /> Permisos Institucionales y Reservas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded accent-salta-earth" />
                <span>Permiso escrito de ingreso a predios / fincas</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded accent-salta-earth" />
                <span>Autorización de uso de imagen y audio</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded accent-salta-earth" />
                <span>Acuerdo de seudónimos / Confidencialidad</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Carga de Acta / Documento Firmado a Google Drive */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-sm font-medium">Adjuntar Acta / Consentimiento Firmado (PDF/Audio):</span>
          {driveUrl && (
            <a href={driveUrl} target="_blank" rel="noreferrer" className="block text-xs text-emerald-400 underline mt-1">
              Ver documento subido en Google Drive
            </a>
          )}
        </div>
        <label className="cursor-pointer bg-salta-earth hover:bg-amber-700 text-white text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition">
          <CloudUpload className="w-4 h-4" />
          {uploading ? "Subiendo a Drive..." : "Subir a Google Drive"}
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
}
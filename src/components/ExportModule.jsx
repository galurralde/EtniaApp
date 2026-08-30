import { Download, FileSpreadsheet, FileText } from 'lucide-react';

import React from 'react';
import { jsPDF } from 'jspdf';

export default function ExportModule({ projectData }) {

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `EtniaApp_${projectData.title || 'Export'}.json`;
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Informe Etnográfico: ${projectData.title || 'EtniaApp Salta'}`, 14, 20);
    doc.setFontSize(11);
    doc.text(`Ubicación: ${projectData.location || 'Norte Salteño'}`, 14, 28);
    doc.text(`Sujeto de Estudio: ${projectData.entityType || 'General'}`, 14, 36);
    doc.text(`Fecha de Exportación: ${new Date().toLocaleDateString()}`, 14, 44);
    
    doc.setFontSize(13);
    doc.text("Resumen de Registros de Campo", 14, 56);
    doc.setFontSize(10);
    doc.text("Corpus registrado mediante EtniaApp listo para análisis cualitativo en Atlas.ti / NVivo.", 14, 64);
    
    doc.save(`EtniaApp_${projectData.title || 'Informe'}.pdf`);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl my-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-salta-sand">
        <Download className="text-salta-earth" /> Exportación e Indización de Corpus
      </h3>
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={exportJSON}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/10 flex items-center gap-2 text-sm font-medium transition"
        >
          <FileText className="w-4 h-4 text-amber-400" /> Exportar a JSON
        </button>

        <button 
          onClick={exportPDF}
          className="px-4 py-2 bg-salta-red hover:bg-red-800 rounded-xl flex items-center gap-2 text-sm font-medium transition shadow-lg text-white"
        >
          <FileSpreadsheet className="w-4 h-4" /> Generar PDF Universitario
        </button>
      </div>
    </div>
  );
}
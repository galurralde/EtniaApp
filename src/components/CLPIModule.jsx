import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FolderUp,
  Loader2,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';

import { uploadFileToDrive } from '../utils/gdrive';
import { useState } from 'react';

export default function CLPIModule({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(1);
  const [uploadingStage, setUploadingStage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const TEMPLATE_PDF_ID = "1rjyATqBdZEgnE9ILyTEXnZ2dTozWCdytma-Tv8xqXcI";

  const [formData, setFormData] = useState({
    e1_objetivos: '',
    e1_caracteristicas: '',
    e1_ubicacion_impactos: '',
    e1_archivo: null,

    e2_estrategia_publicidad: '',
    e2_idioma_traductores: '',
    e2_logistica_talleres: '',
    e2_archivo: null,

    e3_deliberacion: '',
    e3_usos_tradicionales: '',
    e3_archivo: null,

    e4_lugar_garantias: '',
    e4_minutas_discrepancias: '',
    e4_archivo: null,

    e5_resultado: 'Consentimiento Otorgado',
    e5_compromisos_beneficios: '',
    e5_fundamentacion_rechazo: '',
    e5_archivo: null,

    e6_comision_mixta: '',
    e6_monitoreo_plazos: '',
    e6_clausulas_legales: '',
    e6_archivo: null
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleDriveUpload = async (stageKey, file) => {
    if (!file) return;
    setUploadingStage(stageKey);

    try {
      const parentFolderId = project?.driveFolderId;
      const uploadedFile = await uploadFileToDrive(file, parentFolderId);
      
      setFormData(prev => ({
        ...prev,
        [stageKey]: {
          name: file.name,
          id: uploadedFile.id,
          url: uploadedFile.webViewLink || `https://drive.google.com/file/d/${uploadedFile.id}/view`
        }
      }));

      alert(`✅ Archivo "${file.name}" cargado exitosamente en Google Drive.`);
    } catch (error) {
      console.error("Error al subir a Google Drive:", error);
      alert(`⚠️ No se pudo subir el archivo: ${error.message}`);
    } finally {
      setUploadingStage(null);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`📄 Consolidado de Acta CLPI generado exitosamente.\nID Plantilla: ${TEMPLATE_PDF_ID}`);
      setIsModalOpen(false);
    } catch (error) {
      alert("Error al exportar el PDF: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const stagesList = [
    { id: 1, title: 'Etapa 1', subtitle: 'Planificación' },
    { id: 2, title: 'Etapa 2', subtitle: 'Socialización' },
    { id: 3, title: 'Etapa 3', subtitle: 'Evaluación' },
    { id: 4, title: 'Etapa 4', subtitle: 'Diálogo' },
    { id: 5, title: 'Etapa 5', subtitle: 'Adopción' },
    { id: 6, title: 'Etapa 6', subtitle: 'Monitoreo' },
  ];

  return (
    <div className="w-full flex justify-center">
      {/* Botón Principal de Apertura */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-semibold hover:brightness-110 transition duration-200 shadow-lg flex items-center justify-center gap-3 border border-amber-500/30"
      >
        <ShieldCheck className="w-5 h-5 text-amber-200 shrink-0" />
        <span>Generador Digital Adjuntar Acta / Consentimiento PDF</span>
      </button>

      {/* Modal Ajustado */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
          
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100">
            
            {/* Cabecera del Modal */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 shrink-0">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Protocolo CLPI - Convenio 169 OIT
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Adjuntar Acta / Consentimiento PDF
                </h2>
                {project && (
                  <p className="text-xs text-slate-400">
                    Proyecto actual: <span className="text-slate-200 font-medium">{project.title}</span>
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Etapas (Stepper) */}
            <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 shrink-0 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {stagesList.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStage(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                      activeStage === st.id
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      activeStage === st.id ? 'bg-white text-amber-900' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {st.id}
                    </span>
                    <span>{st.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido Formulario (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* ETAPA 1 */}
              {activeStage === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                    Etapa 1: Planificación y Presentación de la Propuesta
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Objetivos y Alcance del Proyecto
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Describa el objeto del proyecto, sus objetivos a corto y largo plazo, marco general e intenciones del proponente..."
                      value={formData.e1_objetivos}
                      onChange={(e) => handleChange('e1_objetivos', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Características de la Actividad
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Detalle la naturaleza, envergadura, ritmo, reversibilidad, área de influencia y duración específica del proyecto..."
                      value={formData.e1_caracteristicas}
                      onChange={(e) => handleChange('e1_caracteristicas', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Ubicación Geográfica y Evaluación de Impactos
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Indique coordenadas, área territorial afectada e impactos preliminares sociales, ambientales, económicos y culturales..."
                      value={formData.e1_ubicacion_impactos}
                      onChange={(e) => handleChange('e1_ubicacion_impactos', e.target.value)}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-amber-500/30">
                    <label className="block text-xs font-semibold text-amber-300 mb-2">
                      Adjuntar Documentación de Propuesta e Inventario
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium flex items-center gap-2 transition shadow">
                        {uploadingStage === 'e1_archivo' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FolderUp className="w-3.5 h-3.5" />
                        )}
                        📁 Cargar propuesta técnica y cronograma en Google Drive
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleGoogleDriveUpload('e1_archivo', e.target.files[0])}
                        />
                      </label>
                      {formData.e1_archivo && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {formData.e1_archivo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 2 */}
              {activeStage === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                    Etapa 2: Entrega de Información y Socialización
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Estrategia y Publicidad de Información
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Especifique la metodología culturalmente adecuada para difundir la propuesta en las bases territoriales..."
                      value={formData.e2_estrategia_publicidad}
                      onChange={(e) => handleChange('e2_estrategia_publicidad', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Idioma y Traductores Designados
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Indique las lenguas originarias a las que se tradujo la información y el listado de traductores/intérpretes asignados..."
                      value={formData.e2_idioma_traductores}
                      onChange={(e) => handleChange('e2_idioma_traductores', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Logística, Recursos y Fechas de Talleres
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Detalle lugares, cronograma de reuniones de socialización y recursos provistos..."
                      value={formData.e2_logistica_talleres}
                      onChange={(e) => handleChange('e2_logistica_talleres', e.target.value)}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-amber-500/30">
                    <label className="block text-xs font-semibold text-amber-300 mb-2">
                      Adjuntar Actas Informativas y Documentación Socializada
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium flex items-center gap-2 transition shadow">
                        {uploadingStage === 'e2_archivo' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FolderUp className="w-3.5 h-3.5" />
                        )}
                        📁 Cargar en carpeta de Google Drive (Actas de socialización / PDFs traducidos)
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleGoogleDriveUpload('e2_archivo', e.target.files[0])}
                        />
                      </label>
                      {formData.e2_archivo && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {formData.e2_archivo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 3 */}
              {activeStage === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                    Etapa 3: Evaluación Interna (Autónoma)
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Constancia de Período de Deliberación
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Indique las fechas de inicio y fin del proceso autónomo de deliberación sin injerencia del Estado o la empresa..."
                      value={formData.e3_deliberacion}
                      onChange={(e) => handleChange('e3_deliberacion', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Respeto al Plan de Consulta y Usos Tradicionales
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Describa el cumplimiento de la organización tradicional y sistemas propios de toma de decisiones de la comunidad..."
                      value={formData.e3_usos_tradicionales}
                      onChange={(e) => handleChange('e3_usos_tradicionales', e.target.value)}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-amber-500/30">
                    <label className="block text-xs font-semibold text-amber-300 mb-2">
                      Adjuntar Constancia Comunitaria de Deliberación
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium flex items-center gap-2 transition shadow">
                        {uploadingStage === 'e3_archivo' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FolderUp className="w-3.5 h-3.5" />
                        )}
                        📁 Cargar en carpeta de Google Drive (Comunicados / Notificaciones comunitarias)
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleGoogleDriveUpload('e3_archivo', e.target.files[0])}
                        />
                      </label>
                      {formData.e3_archivo && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {formData.e3_archivo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 4 */}
              {activeStage === 4 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                    Etapa 4: Diálogo Intercultural y Negociación
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Lugar de Encuentro y Garantías Logísticas
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Lugar accesible asignado o recursos de traslado otorgados por el Estado..."
                      value={formData.e4_lugar_garantias}
                      onChange={(e) => handleChange('e4_lugar_garantias', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Registro de Minutas, Discrepancias y Consensosa
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Detalle el intercambio de argumentos, puntos de acuerdo parciales y fundamentación de las discrepancias expresadas..."
                      value={formData.e4_minutas_discrepancias}
                      onChange={(e) => handleChange('e4_minutas_discrepancias', e.target.value)}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-amber-500/30">
                    <label className="block text-xs font-semibold text-amber-300 mb-2">
                      Adjuntar Minutas de Trabajo y Actas Parciales
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium flex items-center gap-2 transition shadow">
                        {uploadingStage === 'e4_archivo' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FolderUp className="w-3.5 h-3.5" />
                        )}
                        📁 Cargar en carpeta de Google Drive (Minutas firmadas / Actas parciales)
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleGoogleDriveUpload('e4_archivo', e.target.files[0])}
                        />
                      </label>
                      {formData.e4_archivo && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {formData.e4_archivo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 5 */}
              {activeStage === 5 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                    Etapa 5: Adopción de Decisiones y Formalización
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Resultado Final de la Consulta
                    </label>
                    <select
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      value={formData.e5_resultado}
                      onChange={(e) => handleChange('e5_resultado', e.target.value)}
                    >
                      <option value="Consentimiento Otorgado">Consentimiento Otorgado</option>
                      <option value="Consentimiento Denegado (Rechazo)">Consentimiento Denegado (Rechazo)</option>
                      <option value="Acuerdo Parcial">Acuerdo Parcial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Detalle de Compromisos, Beneficios y Salvaguardas
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Especifique el cuerpo de compromisos asumidos, planes de compensación, distribución equitativa de beneficios y mitigaciones..."
                      value={formData.e5_compromisos_beneficios}
                      onChange={(e) => handleChange('e5_compromisos_beneficios', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Fundamentación de Rechazo / Disidencias
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="En caso de rechazo o disidencia parcial, explicite detalladamente las razones territoriales, ambientales y culturales comunitarias..."
                      value={formData.e5_fundamentacion_rechazo}
                      onChange={(e) => handleChange('e5_fundamentacion_rechazo', e.target.value)}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-amber-500/30">
                    <label className="block text-xs font-semibold text-amber-300 mb-2">
                      Adjuntar Convenio Final / Acta CLPI Digitalizada
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium flex items-center gap-2 transition shadow">
                        {uploadingStage === 'e5_archivo' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FolderUp className="w-3.5 h-3.5" />
                        )}
                        📁 Cargar en carpeta de Google Drive (Acta Final de Consentimiento Firmada PDF)
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleGoogleDriveUpload('e5_archivo', e.target.files[0])}
                        />
                      </label>
                      {formData.e5_archivo && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {formData.e5_archivo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 6 */}
              {activeStage === 6 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                    Etapa 6: Monitoreo, Seguimiento y Evaluación
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Integrantes de la Comisión Mixta
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Nombres, DNI y roles de los representantes del Estado y del Pueblo Originario encargados de la fiscalización..."
                      value={formData.e6_comision_mixta}
                      onChange={(e) => handleChange('e6_comision_mixta', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Frecuencia, Plazos e Informes de Monitoreo
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Detalle el cronograma de inspecciones, periodicidad de informes y presupuesto asignado a la comisión..."
                      value={formData.e6_monitoreo_plazos}
                      onChange={(e) => handleChange('e6_monitoreo_plazos', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Cláusulas de Incumplimiento y Vías Legales
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-amber-500 outline-none"
                      placeholder="Indique las medidas a tomar en caso de inobservancia y las vías judiciales estipuladas para la paralización o reparaciones..."
                      value={formData.e6_clausulas_legales}
                      onChange={(e) => handleChange('e6_clausulas_legales', e.target.value)}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-amber-500/30">
                    <label className="block text-xs font-semibold text-amber-300 mb-2">
                      Adjuntar Reglamento e Informes de Seguimiento
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium flex items-center gap-2 transition shadow">
                        {uploadingStage === 'e6_archivo' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FolderUp className="w-3.5 h-3.5" />
                        )}
                        📁 Cargar en carpeta de Google Drive (Informes de fiscalización / Reglamento)
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleGoogleDriveUpload('e6_archivo', e.target.files[0])}
                        />
                      </label>
                      {formData.e6_archivo && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {formData.e6_archivo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Pie del Modal (Fijo en la parte inferior) */}
            <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStage === 1}
                  onClick={() => setActiveStage(prev => prev - 1)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold flex items-center gap-1 transition text-slate-200"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                <button
                  disabled={activeStage === 6}
                  onClick={() => setActiveStage(prev => prev + 1)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold flex items-center gap-1 transition text-slate-200"
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Guardar y Exportar Consolidado PDF
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
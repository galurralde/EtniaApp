/**
 * Guarda documentos, actas firmadas y multimedia directamente 
 * en la carpeta central compartida de EtniaApp en Google Drive.
 */
const CENTRAL_FOLDER_ID = '1jujLxm-yeq_hFg24klrXeLJ41zPeRop4';

export const uploadFileToDrive = async (file) => {
  const token = localStorage.getItem('gdrive_access_token');
  if (!token) {
    throw new Error("Sesión sin token de Google Drive. Vuelve a iniciar sesión con Google.");
  }

  // Definir la metadata indicando la carpeta padre (Central Drive Folder)
  const metadata = {
    name: file.name,
    mimeType: file.type,
    parents: [CENTRAL_FOLDER_ID] // ID de tu carpeta compartida de Drive
  };

  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append('file', file);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Error al conectar con Google Drive API. Asegúrate de tener permisos de edición en la carpeta compartida.");
  }

  return await response.json();
};
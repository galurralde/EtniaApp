/**
 * Utilidades para integrar EtniaApp con Google Drive API y Google Sheets API.
 */
const CENTRAL_FOLDER_ID = '1jujLxm-yeq_hFg24klrXeLJ41zPeRop4';

// Pon aquí el ID de tu Google Sheet Central (lo obtienes de la URL de tu planilla de Sheets)
export const CENTRAL_SHEET_ID = '1SU5yLq6byJ8hKOdOjwkNj6toFqgJlzJwjk4IjFB3d3c';

/**
 * 1. Crea una carpeta propia para el nuevo proyecto dentro de la carpeta madre central.
 */
export const createProjectFolder = async (projectName) => {
  const token = localStorage.getItem('gdrive_access_token');
  if (!token) throw new Error("Sesión sin token de Google Drive. Inicia sesión nuevamente.");

  const metadata = {
    name: `Proyecto: ${projectName}`,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [CENTRAL_FOLDER_ID]
  };

  const response = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metadata)
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Error al crear la carpeta del proyecto en Drive.");
  }

  const folder = await response.json();
  return folder.id; // Retorna el ID de la carpeta recién creada
};

/**
 * 2. Registra los datos del proyecto como una fila en tu planilla de Google Sheets.
 */
export const appendProjectToSheet = async (projectData, folderId) => {
  const token = localStorage.getItem('gdrive_access_token');
  if (!token) throw new Error("Sesión sin token de Google Sheets.");

  // URL del archivo en Google Drive
  const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;

  // Los valores que se insertarán como columnas en el Sheet
  const rowValues = [
    new Date().toLocaleString('es-AR'),     // Fecha de creación
    projectData.title,                      // Nombre del proyecto
    projectData.location || 'No especificada', // Ubicación
    projectData.type || 'Pública',          // Tipo (Pública/Privada)
    projectData.researcher || 'Investigador', // Investigador a cargo
    folderUrl                               // Enlace directo a su carpeta en Drive
  ];

  const range = 'Hoja 1!A:F'; // Nombre de la pestaña en tu Sheet
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${CENTRAL_SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [rowValues]
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Error al registrar fila en Google Sheets.");
  }

  return await response.json();
};

/**
 * 3. Subir archivo dentro de la carpeta específica del proyecto.
 */
export const uploadFileToDrive = async (file, parentFolderId = CENTRAL_FOLDER_ID) => {
  const token = localStorage.getItem('gdrive_access_token');
  if (!token) throw new Error("Sesión sin token de Google Drive.");

  const metadata = {
    name: file.name,
    mimeType: file.type,
    parents: [parentFolderId]
  };

  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append('file', file);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Error al subir el archivo.");
  }

  return await response.json();
};
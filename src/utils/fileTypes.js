export const SUPPORTED_FILE_TYPES = {
  // Base types
  'pdf': 'application/pdf',

  // Documents and presentations
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  
  // Images
  'png': 'image/png',
  
  // Web and text
  'html': 'text/html',
  'md': 'text/markdown'
};

export const SUPPORTED_EXTENSIONS = Object.keys(SUPPORTED_FILE_TYPES);

export const getAcceptedFileTypes = () => {
  return SUPPORTED_EXTENSIONS.map(ext => `.${ext}`).join(',');
};

export const formatFileTypes = () => {
  return SUPPORTED_EXTENSIONS
    .sort()
    .map(ext => ext.toUpperCase())
    .join(', ');
}; 
export const SUPPORTED_FILE_TYPES = {
  // Base types
  'pdf': 'application/pdf',

  // Documents and presentations
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  
  // Images
  'png': 'image/png'
};

export const SUPPORTED_EXTENSIONS = Object.keys(SUPPORTED_FILE_TYPES);

export const getAcceptedFileTypes = () => {
  return [
    '.pdf',
    '.docx',
    '.pptx', 
    '.xlsx',
    '.png'
  ].join(',');
};

export const formatFileTypes = () => {
  return [
    'PDF',
    'Word',
    'PowerPoint',
    'Excel', 
    'PNG'
  ].join('\n');
}; 
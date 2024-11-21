export const SUPPORTED_FILE_TYPES = {
  // Base types
  'pdf': 'application/pdf',

  // Documents and presentations
  '602': 'application/x-t602',
  'abw': 'application/x-abiword',
  'cgm': 'image/cgm',
  'cwk': 'application/x-appleworks-document',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'docm': 'application/vnd.ms-word.document.macroEnabled.12',
  'dot': 'application/msword',
  'dotm': 'application/vnd.ms-word.template.macroEnabled.12',
  'hwp': 'application/x-hwp',
  'key': 'application/x-iwork-keynote-sffkey',
  'lwp': 'application/vnd.lotus-wordpro',
  'pages': 'application/x-iwork-pages-sffpages',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptm': 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'pot': 'application/vnd.ms-powerpoint',
  'potm': 'application/vnd.ms-powerpoint.template.macroEnabled.12',
  'potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
  'rtf': 'application/rtf',
  'txt': 'text/plain',
  'xml': 'application/xml',
  'epub': 'application/epub+zip',

  // Images
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'bmp': 'image/bmp',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'webp': 'image/webp',
  'htm': 'text/html',
  'html': 'text/html',

  // Spreadsheets
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xls': 'application/vnd.ms-excel',
  'xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
  'xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  'csv': 'text/csv',
  'numbers': 'application/x-iwork-numbers-sffnumbers',
  'ods': 'application/vnd.oasis.opendocument.spreadsheet',
  'tsv': 'text/tab-separated-values'
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
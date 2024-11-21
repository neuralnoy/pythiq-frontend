import {
  DocumentIcon,  // Default
  DocumentTextIcon,  // Text files
  PhotoIcon,  // Images
  TableCellsIcon,  // Spreadsheets
  PresentationChartBarIcon,  // Presentations
  DocumentChartBarIcon,  // Spreadsheets alternative
  CodeBracketIcon,  // Code files
  DocumentMagnifyingGlassIcon,  // PDF
  GlobeAltIcon,  // Web files
} from '@heroicons/react/24/outline';

export const FILE_TYPE_GROUPS = {
  // Documents
  'pdf': {
    icon: DocumentMagnifyingGlassIcon,
    color: 'text-red-500'
  },
  
  // Text and Documents
  'txt': {
    icon: DocumentTextIcon,
    color: 'text-gray-500'
  },
  'rtf': {
    icon: DocumentTextIcon,
    color: 'text-gray-500'
  },
  'doc': {
    icon: DocumentTextIcon,
    color: 'text-blue-500'
  },
  'docx': {
    icon: DocumentTextIcon,
    color: 'text-blue-500'
  },
  'docm': {
    icon: DocumentTextIcon,
    color: 'text-blue-500'
  },
  
  // Presentations
  'ppt': {
    icon: PresentationChartBarIcon,
    color: 'text-orange-500'
  },
  'pptx': {
    icon: PresentationChartBarIcon,
    color: 'text-orange-500'
  },
  'pptm': {
    icon: PresentationChartBarIcon,
    color: 'text-orange-500'
  },
  
  // Spreadsheets
  'xlsx': {
    icon: TableCellsIcon,
    color: 'text-green-500'
  },
  'xls': {
    icon: TableCellsIcon,
    color: 'text-green-500'
  },
  'csv': {
    icon: DocumentChartBarIcon,
    color: 'text-green-500'
  },
  'tsv': {
    icon: DocumentChartBarIcon,
    color: 'text-green-500'
  },
  
  // Images
  'jpg': {
    icon: PhotoIcon,
    color: 'text-purple-500'
  },
  'jpeg': {
    icon: PhotoIcon,
    color: 'text-purple-500'
  },
  'png': {
    icon: PhotoIcon,
    color: 'text-purple-500'
  },
  'gif': {
    icon: PhotoIcon,
    color: 'text-purple-500'
  },
  'bmp': {
    icon: PhotoIcon,
    color: 'text-purple-500'
  },
  'svg': {
    icon: PhotoIcon,
    color: 'text-purple-500'
  },
  
  // Web
  'html': {
    icon: GlobeAltIcon,
    color: 'text-blue-400'
  },
  'htm': {
    icon: GlobeAltIcon,
    color: 'text-blue-400'
  },
  'xml': {
    icon: CodeBracketIcon,
    color: 'text-yellow-500'
  }
};

export const getFileTypeIcon = (filename) => {
  const extension = filename.toLowerCase().split('.').pop();
  return FILE_TYPE_GROUPS[extension] || {
    icon: DocumentIcon,
    color: 'text-gray-400'
  };
}; 
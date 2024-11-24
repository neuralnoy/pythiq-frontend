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
  'docx': {
    icon: DocumentTextIcon,
    color: 'text-blue-500'
  },
  'pptx': {
    icon: PresentationChartBarIcon,
    color: 'text-orange-500'
  },
  'xlsx': {
    icon: TableCellsIcon,
    color: 'text-green-500'
  },
  'png': {
    icon: PhotoIcon,
    color: 'text-purple-500'
  },
  'html': {
    icon: GlobeAltIcon,
    color: 'text-blue-400'
  },
  'md': {
    icon: DocumentTextIcon,
    color: 'text-gray-500'
  }
};

export const getFileTypeIcon = (filename) => {
  const extension = filename.toLowerCase().split('.').pop();
  return FILE_TYPE_GROUPS[extension] || {
    icon: DocumentIcon,
    color: 'text-gray-400'
  };
}; 
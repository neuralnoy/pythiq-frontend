import PropTypes from 'prop-types';
import { getFileTypeIcon } from '../../utils/fileTypeIcons';

const FileIcon = ({ filename, className = "w-5 h-5" }) => {
  const { icon: Icon, color } = getFileTypeIcon(filename);
  
  return (
    <Icon className={`${className} ${color}`} />
  );
};

FileIcon.propTypes = {
  filename: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FileIcon; 
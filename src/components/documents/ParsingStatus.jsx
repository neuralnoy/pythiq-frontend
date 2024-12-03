import { useState, useEffect } from 'react';
import { documentService } from '../../services/documentService';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const ParsingStatus = ({ document, onStatusChange }) => {
  const [status, setStatus] = useState(document.parsing_status || 'processing');
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    try {
      const result = await documentService.getParsingStatus(
        document.knowledge_base_id,
        document.id
      );
      if (result.status !== status) {
        setStatus(result.status);
        onStatusChange?.(result.status);
      }
    } catch (error) {
      console.error('Failed to check parsing status:', error);
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    try {
      await documentService.startParsing(
        document.knowledge_base_id,
        document.id
      );
      setStatus('processing');
      onStatusChange?.('processing');
    } catch (error) {
      console.error('Failed to retry parsing:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  if (status === 'processing') {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-xs text-primary"></span>
        <span className="text-xs text-gray-600">Processing...</span>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="badge badge-success gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Parsed
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center gap-2">
        <div className="badge badge-error">Failed</div>
        <button
          onClick={handleRetry}
          disabled={loading}
          className="btn btn-circle btn-xs btn-ghost"
          title="Retry parsing"
        >
          <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    );
  }

  return null;
};

export default ParsingStatus; 
import React, { useState, useEffect } from 'react';
import { parsedDocumentService } from '../../services/parsedDocumentService';
import { formatDate } from '../../utils/formatters';

const ParsedDocumentViewer = ({ documentId, knowledgeBaseId }) => {
    const [parsedVersions, setParsedVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadParsedVersions();
    }, [documentId, knowledgeBaseId]);

    const loadParsedVersions = async () => {
        try {
            const versions = await parsedDocumentService.getParsedVersions(
                knowledgeBaseId,
                documentId
            );
            setParsedVersions(versions);
            if (versions.length > 0) {
                setSelectedVersion(versions[0]);
                await loadContent(versions[0].id);
            }
        } catch (error) {
            setError('Failed to load parsed versions');
        } finally {
            setLoading(false);
        }
    };

    const loadContent = async (parsedId) => {
        try {
            const { content } = await parsedDocumentService.getParsedContent(
                knowledgeBaseId,
                documentId,
                parsedId
            );
            setContent(content);
        } catch (error) {
            setError('Failed to load content');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-error">{error}</div>;
    if (!parsedVersions.length) return <div>No parsed versions available</div>;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title">Parsed Document</h2>
                    <select 
                        className="select select-bordered w-full max-w-xs"
                        value={selectedVersion?.id}
                        onChange={(e) => {
                            const version = parsedVersions.find(v => v.id === e.target.value);
                            setSelectedVersion(version);
                            loadContent(version.id);
                        }}
                    >
                        {parsedVersions.map(version => (
                            <option key={version.id} value={version.id}>
                                {formatDate(version.parsed_at)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="prose max-w-none">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ParsedDocumentViewer; 
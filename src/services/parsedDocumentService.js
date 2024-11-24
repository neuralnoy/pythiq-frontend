const API_URL = 'http://localhost:8000/api';

export const parsedDocumentService = {
    async getParsedVersions(knowledgeBaseId, documentId) {
        const response = await fetch(
            `${API_URL}/parsed-documents/${knowledgeBaseId}/${documentId}/parsed`,
            {
                credentials: 'include'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch parsed versions');
        }

        return await response.json();
    },

    async getParsedContent(knowledgeBaseId, documentId, parsedId) {
        const response = await fetch(
            `${API_URL}/parsed-documents/${knowledgeBaseId}/${documentId}/parsed/${parsedId}/content`,
            {
                credentials: 'include'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch parsed content');
        }

        return await response.json();
    }
}; 
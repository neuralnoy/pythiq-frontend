// src/pages/KnowledgeBase.jsx
import React from 'react';
import AddCard from '../components/knowledge/AddCard';
import CardList from '../components/knowledge/CardList';

const KnowledgeBase = () => {
  return (
    <div>
      <AddCard />
      <CardList />
    </div>
  );
};

export default KnowledgeBase;

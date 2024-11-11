import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardList = () => {
  const [cards, setCards] = useState([]);

  // Fetch cards from the backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cards');
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cards.map((card, index) => (
        <div key={index} className="card w-full bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-lg font-bold">{card.name}</h3>
            <p className="text-sm">{card.description}</p>
            <p className="text-xs text-gray-500">
              Created at: {new Date(card.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;

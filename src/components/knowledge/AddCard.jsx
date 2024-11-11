import React, { useState } from 'react';
import axios from 'axios';

const AddCard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/cards', { 
        name, 
        description 
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Card</h2>
      <form onSubmit={handleAddCard}>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="textarea textarea-bordered w-full max-w-xs"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;

'use client';
import React, { useState } from 'react';

const AddSlotForm = () => {
  const [carpenterId, setCarpenterId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carpenterId, startTime, endTime }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Slot created successfully!');
      } else {
        alert(data.error || 'Failed to create slot');
      }
    } catch (error) {
      console.error('Error adding slot:', error);
      alert('Error adding slot');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add New Slot</h2>
      <label className="block mb-2">
        Carpenter ID:
        <input
          type="text"
          value={carpenterId}
          onChange={(e) => setCarpenterId(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Start Time (ISO format):
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="2025-02-06T09:00:00Z"
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        End Time (ISO format):
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="2025-02-06T10:00:00Z"
          className="w-full p-2 border rounded"
        />
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Add Slot
      </button>
    </form>
  );
};

export default AddSlotForm;

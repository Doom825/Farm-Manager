import React, { useState, useEffect } from 'react';

const CropJournal = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allCrops, setAllCrops] = useState([]);
  const [userId, setUserId] = useState(null); // Use useState to store userId

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId); // Update the state if user_id exists
    } else {
      console.log('No user_id found in localStorage');
    }
  }, []);

  useEffect(() => {
    // Only fetch crops if userId is available
    if (userId) {
      const fetchCrops = async () => {
        try {
          console.log(`Fetching crops for user ID: ${userId}`); // Check if the userId is correct
          const response = await fetch(`/api/crops/user/${userId}`);
          const data = await response.json();
          setCrops(data);
        } catch (error) {
          console.error('Error fetching crops:', error);
        }
      };

      const fetchAllCrops = async () => {
        try {
          const response = await fetch('/api/crops'); // Gets all crops
          const data = await response.json();
          setAllCrops(data);
        } catch (error) {
          console.error('Error fetching all crops:', error);
        }
      };

      fetchCrops();
      fetchAllCrops();
    }
  }, [userId]); // Fetch crops only when userId is available

  const handleAddCrop = async (cropId) => {
    try {
      const response = await fetch(`/api/crops/add/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cropId }),
      });

      if (response.ok) {
        // Refresh the crops list
        const updatedCrops = await response.json();
        setCrops(updatedCrops);
        setSearchTerm('');
      }
    } catch (err) {
      console.error('Error adding crop:', err);
    }
  };

  const matchingCrops = allCrops.filter(crop =>
    crop.crop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Your Crop Journal</h2>
      <ul>
        {crops.length > 0 ? (
          crops.map((crop) => (
            <li key={crop.crop_id}>
              {crop.crop_name} ({crop.slug})
            </li>
          ))
        ) : (
          <p>No crops found for this user.</p>
        )}
      </ul>

      <label htmlFor="cropSearch">Add new crop to list</label>
      <input
        id="cropSearch"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search crops..."
      />

      {searchTerm && (
        <ul>
          {matchingCrops.map((crop) => (
            <li key={crop.crop_id}>
              {crop.crop_name}
              <button onClick={() => handleAddCrop(crop.crop_id)}>Add</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CropJournal;
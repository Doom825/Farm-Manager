import React, { useState, useEffect } from 'react';

const CropJournal = () => {
  const [crops, setCrops] = useState([]); // List of user's crops
  const [searchTerm, setSearchTerm] = useState('');
  const [allCrops, setAllCrops] = useState([]); // List of all available crops
  const [userId, setUserId] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null); // State to store selected crop

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId); // Set userId if found in localStorage
    } else {
      console.log('No user_id found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchCrops = async () => {
        try {
          console.log(`Fetching crops for user ID: ${userId}`);
          const response = await fetch(`/api/crops/user/${userId}`);
          const data = await response.json();
          setCrops(data);
        } catch (error) {
          console.error('Error fetching crops:', error);
        }
      };

      const fetchAllCrops = async () => {
        try {
          const response = await fetch('/api/crops/all'); // Fetch all crop names
          const data = await response.json();
          console.log('All Crops:', data); // Check what data is returned
          setAllCrops(data); // Set the state with the fetched crop names
        } catch (error) {
          console.error('Error fetching all crops:', error);
        }
      };

      fetchCrops();
      fetchAllCrops();
    }
  }, [userId]);

  const handleAddCrop = async (cropName) => {
    try {
      // Fetch the crop_id using the selected cropName
      const cropResponse = await fetch(`/api/crops/id/${cropName}`);
      const cropData = await cropResponse.json();
  
      // Check if the crop was found
      if (cropData && cropData.crop_id) {
        const response = await fetch(`/api/crops/add/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cropId: cropData.crop_id }), // Send cropId to add to user_crop
        });
  
        if (response.ok) {
          const updatedCrops = await response.json();
          setCrops(updatedCrops); // Update crops after adding
          setSearchTerm(''); // Clear search term after adding
          setSelectedCrop(null); // Clear the selected crop after adding
        }
      } else {
        console.log('Crop not found in the database');
      }
    } catch (err) {
      console.error('Error adding crop:', err);
    }
  };

  const matchingCrops = allCrops.filter(crop =>
    crop.toLowerCase().includes(searchTerm.toLowerCase()) // Search logic based on crop name
  );

  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);
    setSearchTerm(''); // Clear search field when crop is selected
  };

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
        onChange={(e) => setSearchTerm(e.target.value)} // Handle search term input
        placeholder="Search crops..."
      />

      {searchTerm && (
        <ul>
          {matchingCrops.length > 0 ? (
            matchingCrops.map((crop, index) => (
              <li key={index} onClick={() => handleSelectCrop(crop)}>
                <span style={{ cursor: 'pointer' }}>{crop}</span> {/* Crop name is now clickable */}
              </li>
            ))
          ) : (
            <li>No crops found matching your search.</li>
          )}
        </ul>
      )}

      {/* Only display "Add" button when a crop is selected */}
      {selectedCrop && (
        <div>
          <p>Selected Crop: {selectedCrop}</p>
          <button onClick={() => handleAddCrop(selectedCrop)}>Add</button>
        </div>
      )}
    </div>
  );
};

export default CropJournal;
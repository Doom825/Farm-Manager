import React, { useState, useEffect } from 'react';

const CropJournal = ({ userId }) => {
  const [crops, setCrops] = useState([]);
  
  useEffect(() => {
    // Fetch crops for the active user when the component mounts
    const fetchCrops = async () => {
      try {
        const response = await fetch(`/api/crops/user/${userId}`);
        const data = await response.json();
        setCrops(data); // Set the fetched crops into state
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    
    fetchCrops();
  }, [userId]); // Only re-run when userId changes

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
    </div>
  );
};

export default CropJournal;
// WeatherStories.jsx
import React, { useState } from 'react';

const WeatherStories = ({ onSubmit }) => {
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    // Handle image upload
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Submit the story and image to the parent component
    onSubmit({ story, image });
    // Clear the form after submission
    setStory('');
    setImage(null);
  };

  return (
    <div className="weather-stories-form">
      <textarea
        placeholder="Share your weather story..."
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WeatherStories;

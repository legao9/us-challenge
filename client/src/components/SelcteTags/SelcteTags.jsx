import React, { useState } from 'react';

const SelectTags = ({addTags}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = [
    'Vegan',
    'Diabetes',
    'Weight Loss',
    'Build Muscle',
    'More Energy',
    'Eat Well',
    'Quit Smoking',
    'No Sugar',
    'Drink Water',
  ];

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      addTags([...selectedTags, tag])
    }
  };

  const handleTagDelete = (tag) => {
    const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    setSelectedTags(updatedTags);
    addTags([...selectedTags, tag])
  };

  return (
    <div>
      <select onChange={(e) => handleTagSelect(e.target.value)}>
        <option value="">Select Tag</option>
        {availableTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div>
        <p>Selected Tags:</p>
        <ul>
          {selectedTags.map((tag) => (
            <li key={tag}>
              {tag}{' '}
              <button onClick={() => handleTagDelete(tag)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectTags;

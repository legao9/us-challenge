import React, { useState } from 'react';

const TaskSelection = ({addTasks}) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasksData, setTasksData] = useState([]);

const availableTasks = [
  'Gym Check in',
  'Log Food',
  'Attend Workshop',
  'Take Quiz',
  'Take Poll',
  'Create Recipe',
];

  const handleTaskToggle = (task) => {
    if (selectedTasks.includes(task)) {
      // If task is already selected, remove it
      const updatedTasks = selectedTasks.filter((selectedTask) => selectedTask !== task);
      setSelectedTasks(updatedTasks);
    } else {
      // If task is not selected, add it
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const handlePointsChange = (task, points) => {
    // Update the points for the selected task
    const updatedTasksData = tasksData.map((item) =>
      item.task === task ? { ...item, points } : item
    );
    setTasksData(updatedTasksData);
    addTasks(updatedTasksData)
  };

  const handleCheckboxChange = (task) => {
    // Check if the task is already in the array, if not, add it with default points
    if (!tasksData.find((item) => item.task === task)) {
      setTasksData([...tasksData, { task, points: 0 }]);
    }
  };

  return (
    <div>
      <h2>Select Tasks:</h2>
      {availableTasks.map((task) => (
        <div key={task}>
          <label>
            <input
              type="checkbox"
              checked={selectedTasks.includes(task)}
              onChange={() => {
                handleTaskToggle(task);
                handleCheckboxChange(task);
              }}
            />
            {task}
          </label>
          {selectedTasks.includes(task) && (
            <div>
              <label>Points:</label>
              <input
                type="number"
                value={tasksData.find((item) => item.task === task)?.points || 0}
                onChange={(e) => handlePointsChange(task, parseInt(e.target.value, 10))}
              />
            </div>
          )}
        </div>
      ))}

      <div>
        <h2>Selected Tasks:</h2>
        <ul>
          {tasksData.map(({ task, points }) => (
            <li key={task}>
              Task: {task}, Points: {points}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskSelection;

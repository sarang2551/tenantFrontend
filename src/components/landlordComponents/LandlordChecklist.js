import React, { useState } from 'react';

const Checklist = () => {
  // State to manage the checkbox status
  const [tasks, setTasks] = useState([
    { id: 'label-1', checked: true, tenant: 'Tenant 1', task: 'aircon smoking' },
    { id: 'label-2', checked: true, tenant: 'Tenant 2', task: 'windows broken' },
    { id: 'label-3', checked: false, tenant: 'Tenant 3', task: 'Fan strange noise' },
    { id: 'label-4', checked: false, tenant: 'Tenant 4', task: 'loose screws on the door' },
  ]);

  // Function to handle checkbox state change
  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  return (
    <div className="tasks">
      <h1>Checklist</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            id={task.id}
            type="checkbox"
            checked={task.checked}
            onChange={() => handleCheckboxChange(task.id)}
          />
          <label htmlFor={task.id}>
            <div>
              <h2>{task.tenant}</h2>
            </div>
            <div>
              <span>{task.task}</span>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Checklist;

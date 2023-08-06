import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Checklist = () => {
  const [tasks, setTasks] = useState([
    { id: 'tenant-1', tenant: 'Tenant 1', task: 'aircon smoking', selectedOption: null },
    { id: 'tenant-2', tenant: 'Tenant 2', task: 'windows broken', selectedOption: null },
    { id: 'tenant-3', tenant: 'Tenant 3', task: 'Fan strange noise', selectedOption: null },
    { id: 'tenant-4', tenant: 'Tenant 4', task: 'loose screws on the door', selectedOption: null },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef();

  const handleDropdownToggle = (tenantId) => {
    setOpenDropdownId((prevState) => (prevState === tenantId ? null : tenantId));
  };

  const handleTaskSelect = (tenantId, option) => {}

  const fetchData = async() =>{
    const userID = sessionStorage.getItem('userID')
    const response  = await axios.get(`http://localhost:8000/landlord/getTenantList/${userID}`)
    // use the data above
  }
  useEffect(()=>{
    fetchData()
  })
  // Function to handle checkbox state change
  const handleCheckboxChange = (taskId,tenantId,option) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === tenantId ? { ...task, selectedOption: option } : task
      )
    );
    setOpenDropdownId(null); // Close the dropdown after selecting an option
  };

  useEffect(() => {
    // Add event listener to close the dropdown when clicking outside the dropdown area
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="tasks" style={{ height: `10px` }}>
      <h1>Checklist</h1>
      {tasks.map((task) => (
        <div className="main-container" key={task.id}>
          <label htmlFor={task.id} className='customLabel'>
            <div className="tenant-task-container">
              <div className="tenant-info">
                <label>{task.tenant}</label>
              </div>
              <div className="task-info">
                <label>{task.task}</label>
              </div>
              <div className="button-drop-container">
                <form className="button-group">
                  <div className="drop-button-wrap">
                    <input
                      id={`db${task.id}`}
                      type="checkbox"
                      checked={openDropdownId === task.id}
                      readOnly
                    />
                    <label
                      htmlFor={`db${task.id}`}
                      className={`drop-button ${openDropdownId === task.id ? 'active' : ''}`}
                      onClick={() => handleDropdownToggle(task.id)}
                    ></label>
                    {openDropdownId === task.id && (
                      <div className={`drop-pop open`}>
                        <button type="reset" onClick={() => handleTaskSelect(task.id, 'ticket1')}>ticket1</button>
                        <button type="reset" onClick={() => handleTaskSelect(task.id, 'ticket2')}>ticket2</button>
                        <button type="reset" onClick={() => handleTaskSelect(task.id, 'ticket3')}>ticket3</button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}


export default Checklist;

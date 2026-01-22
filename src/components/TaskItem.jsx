import React, { useState } from 'react';
import api from '../services/api';

const TaskItem = ({ task, priorityColor, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
  });

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/tasks/${task._id}`, editData);
      onUpdate(res.data);
      setEditing(false);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${task._id}`);
        onDelete(task._id);
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`task-item priority-${priorityColor}`}>
      {editing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleEditChange}
          />
          <div className="form-row">
            <select name="status" value={editData.status} onChange={handleEditChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select name="priority" value={editData.priority} onChange={handleEditChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleEditChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-header">
            <h4>{task.title}</h4>
            <div className="task-actions">
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
          </div>
          {task.description && <p>{task.description}</p>}
          <div className="task-meta">
            <span className={`status status-${task.status}`}>{task.status.replace('-', ' ')}</span>
            <span className={`priority priority-${priorityColor}`}>{task.priority}</span>
            {task.dueDate && <span className="due-date">Due: {formatDate(task.dueDate)}</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;

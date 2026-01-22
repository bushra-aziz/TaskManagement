import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="task-list">
      <h3>Your Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              priorityColor={getPriorityColor(task.priority)}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

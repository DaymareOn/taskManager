import React from 'react';

const TaskCard: React.FC = () => {
    return (
        <div className="task-card">
            <h3>Task Title</h3>
            <p>Description of the task.</p>
            <button>Complete</button>
        </div>
    );
};

export default TaskCard;
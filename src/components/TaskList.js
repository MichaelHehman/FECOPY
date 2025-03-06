import React from 'react';  
import styles from './TaskList.module.css';  
import TaskItem from './TaskItem';  
  
function TaskList({ tasks, onComplete, onDelete }) {  
    if (!tasks || tasks.length === 0) {  
        return <div className={styles.emptyList}>No tasks available</div>;  
    }  
  
    return (  
        <div className={styles.list}>  
            {tasks.map((task) => (  
                <TaskItem  
                    key={task.id}  
                    task={task}  
                    onComplete={onComplete}  
                    onDelete={onDelete}  
                />  
            ))}  
        </div>  
    );  
}  
  
export default TaskList;  
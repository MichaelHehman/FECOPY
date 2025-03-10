import React from 'react';  
import styles from './TaskItem.module.css';  
  
function TaskItem({ task, onComplete, onDelete }) {  
    return (  
        <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>  
            <div className={styles.taskContent}>  
                <h3 className={styles.taskTitle}>{task.title}</h3>  
                <p className={styles.taskDescription}>{task.description}</p>  
            </div>  
            <div className={styles.taskActions}>  
                <button   
                    className={styles.completeBtn}  
                    onClick={() => onComplete(task.id)}  
                >  
                    {task.completed ? '✓' : 'Complete'}  
                </button>  
                <button   
                    className={styles.deleteBtn}  
                    onClick={() => onDelete(task.id)}  
                >  
                    Delete  
                </button>  
            </div>  
        </div>  
    );  
}  
  
export default TaskItem;  
import React from 'react';
import styles from './TaskItem.module.css';

const TaskItem = ({ task }) => {
    return <li
        className={styles.taskItem}
        key={task.id}
    >
        <div>{task.content}</div>
        <div>{task.content}</div>
        <div>{task.content}</div>
        <div>{task.content}</div>
    </li>
}

export default TaskItem;
import React from 'react';
import styles from './TaskList.module.css';
import TaskItem from './TaskItem';

const TaskList = ({ taskList }) => {
    return <ul className={styles.list}>
        {taskList.map((task) => <TaskItem key={task.id} task={task} />)}
    </ul>
}

export default TaskList;
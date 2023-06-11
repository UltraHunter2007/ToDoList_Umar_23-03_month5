import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTasks } from "../../redux/taskReducer/taskReducer";

const Tasks = () => {
    const [ newTask, setNewTask ] = useState('');
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const inputTask = (e) => {
        setNewTodo(e.target.value);
    }

    const sendForm = () => {
        if (newTask.trim() !== '') {
            const task = {
                title: newTask,
                completed: false
            };
            dispatch(addTask(task));
            setNewTask('');
        }
    }

    const clickDeleteTask = (task) => {
        dispatch(deleteTask(task.id));
    }

    return (
        <div>
            <h2>Task List</h2>
            <input type="text" onChange={inputTask} value={newTask} placeholder={'Add new Task...'} />
            <button className='btn' onClick={sendForm}>Добавить</button>

            <div>
                {tasks && (
                    <ul>
                        {tasks.map(task =>
                            <li key={task.id}>
                                {task.title}
                                <button onClick={() => clickDeleteTask(task)}>Удалить</button>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Tasks;

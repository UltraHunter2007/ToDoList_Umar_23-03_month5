import axios from "axios";

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    if (action.type === 'ADD_TASK') {
        return { ...state, tasks: [...state.tasks, action.payload] };
    } else if (action.type === 'REMOVE_TASK') {
        return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    } else if (action.type === 'SET_TASKS') {
        return { ...state, tasks: action.payload };
    } else {
        return state;
    }
};

export const fetchTasks = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15');
            dispatch({ type: 'SET_TASKS', payload: response.data });
        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    };
};

export const addTask = (payload) => {
    return (dispatch) => {
        axios.post('https://jsonplaceholder.typicode.com/tasks', payload)
            .then((response) => {
                dispatch({ type: 'ADD_TASK', payload: response.data });
            })
            .catch((error) => {
                console.log('Error adding task:', error);
            });
    };
};

export const deleteTask = (payload) => {
    return (dispatch) => {
        fetch(`URL/${payload}`, { method: 'DELETE' })
            .then(() => {
                dispatch({ type: 'REMOVE_TASK', payload });
            })
            .catch((error) => {
                console.log('Error deleting the task:', error);
            });
    };
};

export default taskReducer;
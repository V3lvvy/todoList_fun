import React, { useState } from 'react';
import './TodoList.css';
import 'animate.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});
    const [deletingIndex, setDeletingIndex] = useState(null);

    const handleAddTodo = () => {
        if (headingInput.trim() !== '') {
            setTodos([...todos, {heading: headingInput, lists: [] }]);
            setHeadingInput('');
        }
    };

    const handleAddList = (index) => {
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos];
            newTodos[index].lists.push({ text: listInputs[index], completed: false});
            setTodos(newTodos);
            setListInputs({...listInputs, [index]: ''});
        }
    };

    const handleListInputChange = (index, value) => {
        setListInputs({...listInputs, [index]: value });
    };

    const handleDeleteTodo = (index) => {
        setDeletingIndex(index); 
        setTimeout( () => {
        const newTodos = [...todos];
          newTodos.splice(index, 1);
          setTodos(newTodos);
          setDeletingIndex(null);
        }, 2000);
    };

    const handleToggleComplete = (todoIndex, listIndex) => {
      const updatedTodos = [...todos];
      const task = updatedTodos[todoIndex].lists[listIndex];
      task.completed = !task.completed;
      setTodos(updatedTodos);
    }
    

    
  return (
    <div className='wrapper'>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter Task"
            value={headingInput}
            onChange={(e) => {setHeadingInput(e.target.value);}}
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
      <div className="todo_main"> 
        {todos.map((todo, index) => (
            <div key={index} className={`todo-card ${deletingIndex === index ? 'animate__animated animate__hinge' : ""}`}>
                <div className='heading_todo'>
                    <h3>{todo.heading}</h3> 
                    <button className='delete-button' onClick={() => handleDeleteTodo(index)}>Delete</button>
                </div>
                <ul className='lists'>
                    {todo.lists.map((list, listIndex) => (
                        <li key={listIndex} className='todo_inside_list'>
                            <label className='checkbox-label'>
                              <input type='checkbox' checked={list.completed} onChange={() => handleToggleComplete(index, listIndex)}/>
                              <p className={list.completed ? 'completed' : ''}>{list.text}</p>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className='add_list'>
                    <input
                    type="text"
                    className='list-input'
                    placeholder='Add List'
                    value={listInputs[index] || ''}
                    onChange={(e) => handleListInputChange(index, e.target.value)}/>
                    <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

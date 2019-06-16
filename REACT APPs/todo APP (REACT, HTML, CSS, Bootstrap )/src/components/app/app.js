import React from 'react';

import AppHeader from '../app-header';
import SearchPannel from '../search-pannel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

const todoData = [
  { label: 'Drink Coffee', important: false, id: 1 },
  { label: 'Make Awesome App', important: true, id: 2 },
  { label: 'Have a lunch', important: false, id: 3 }   
];

const App = () => {
  return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3}/>
      <div className="top-panel d-flex">
        <SearchPannel />
        <ItemStatusFilter />
      </div> 
    
      <ToDoList 
      todos={todoData}
      onDeleted={(id) => console.log('del', id)}/>
    </div>
  );
};

export default App;

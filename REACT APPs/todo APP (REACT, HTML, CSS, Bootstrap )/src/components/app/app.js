import React from 'react';

import AppHeader from '../app-header';
import SearchPannel from '../search-pannel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemForm from '../add-item-form';

import './app.css';

export default class App extends React.Component {

  maxId = 100;

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }   
    ]
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
        // так делать нельзя делать т.к. меняем state- todoData.splice(idx, 1);

        const newArr = [...todoData.slice(0, idx), //добавляем в массив часть todoData до удаленного элемента
                        ...todoData.slice(idx + 1) //добавляем в массив часть todoData после удаленного элемента
                      ];
        return {
          todoData: newArr
        }
    })
  };

  addItem = (text) => {

    const newItem = {
      label: text,
      important: false,
      id: this.maxId++
    }

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      };
    });
  }

  render() {
    return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3}/>
      <div className="top-panel d-flex">
        <SearchPannel />
        <ItemStatusFilter />
      </div> 
    
      <ToDoList 
      todos={this.state.todoData}
      onDeleted={ this.deleteItem }/>
      <AddItemForm 
      onAddItem={this.addItem}/>
    </div>
    );
  };
};

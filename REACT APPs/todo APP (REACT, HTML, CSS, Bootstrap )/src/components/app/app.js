import React from 'react';

import AppHeader from '../app-header';
import SearchPannel from '../search-pannel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemForm from '../add-item-form';

import './app.css';
import { isParenthesizedExpression } from '@babel/types';

export default class App extends React.Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'), 
      this.createTodoItem('Have a lunch'),  
    ], 
    term: '',
    filter: 'all' // active, all, done
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

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
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      };
    });
  }; 

  //функция для поиска совпадений в списке задач
  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      //0 значит содержит строку term
      return item.label.toLowercase().indexOf(term.toLowercase()) > -1;
    });
  }

  filter(items, filter) {

    switch(filter) {
      case 'all': 
        return items;
      case 'active': 
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item = item.done);  
      default: 
        return items;  
    };
  }


  //для изменения флагов done и important
  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);

      //чтобы не изменять state напрямую создаем другой объект(копируем)
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      return [
        ...arr.slice(0, idx), newItem, 
        ...arr.slice(idx + 1) 
      ];       
    }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };                
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };                
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;//запись в переменную для сокращения кода
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;                  
    
    return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount}/>
      <div className="top-panel d-flex">
        <SearchPannel 
          onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange}/>
      </div> 
    
      <ToDoList 
      todos={visibleItems}
      onDeleted={this.deleteItem}
      onToggleImportant ={this.onToggleImportant}
      onToggleDone={this.onToggleDone}/>
      <AddItemForm 
      onAddItem={this.addItem}/>
    </div>
    );
  };
};


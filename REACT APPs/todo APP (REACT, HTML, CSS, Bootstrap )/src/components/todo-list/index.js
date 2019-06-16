import ToDoList from './todo-list';

export default ToDoList;

function getCounter() {
  let counter = 0;

  return function() {
    return counter++;
  };
}

let count = getCounter();
console.log(count());//0
console.log(count());//1  
console.log(count());//2
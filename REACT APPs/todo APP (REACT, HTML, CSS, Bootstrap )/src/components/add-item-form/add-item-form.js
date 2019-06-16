import React from 'react';
import './add-item-form.css';

export default class AddItemForm extends React.Component {

  render() {
    return (
       <div 
       className='add-item-form'
       onClick={() => this.props.onAddItem('Hello world')}>
        <button className='btn btn-outline-secondary'>
           Add Item
          </button>
       </div>    
    );
  };
};
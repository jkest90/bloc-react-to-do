import React, {Component} from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         todos: [
            { description: 'Walk the cat', isCompleted: true },
            { description: 'Throw the dishes away', isCompleted: false },
            { description: 'Buy new dishes', isCompleted: false }
         ]
      };
   }
   render() {
      return (
        <div className="App">
            <ul>
               { this.state.todos.map( (todo, index) =>
                  <ToDo key= { index } description={ todo.description } isCompleted={ todo.isCompleted } />
               )}
            </ul>
         </div>
      );
    }
}

export default App;

// Checkpoint 2.6 //
/*
Step 1: Define constructor function that calls super (its parent's constructor) and own constructor.
Step 2: Define this.state as an array of to-do objects with properties of 'description' and 'isCompleted'.
Step 3: Display the to-dos within this.state using .map(), returning a new array of each item. Enclose the call to map with { }, which tells JSX to evaluate the code between braces as JS. For React to operate properly, each child of an array or iterator needs to have a key with a unique value. Specify a 'key' attribute on ToDo equal to each item's index. This gives us a unique identifier for each item.
*/

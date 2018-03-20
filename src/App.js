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
         ],
         newTodoDescription: ''
      };
   }

   // Called onChange. Sets the state of newToDoDescription equal to the target value of our input.
   handleChange(e) {
      this.setState({ newTodoDescription: e.target.value })
   }

   handleSubmit(e) {
      // prevent default action of page reload.
      e.preventDefault();
      // if no description input, return
      if (!this.state.newTodoDescription) { return }
      // define a variable object with properties of description and isCompleted.
      const newTodo = { description: this.state.newTodoDescription, isCompleted: false};
      // set this.state.todos equal to an array of the current todos and the new todo item.
      this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
   }


   toggleComplete(index) {
      // call slice to backup/copy the original todos array without modifying the original. save copy in 'todos'.
      const todos = this.state.todos.slice();
      // 'todo' represents the todo at each current index.
      const todo = todos[index];
      // if todo.isCompleted is false, onChange make it true. if true, onChange make it false.
      todo.isCompleted = todo.isCompleted ? false : true;
      // update state to reflect these changes.
      this.setState({ todos: todos });
   }

   deleteTodo(index) {
      const todos = this.state.todos.slice();
      const todo = todos[index];
      const deletedTodo = todos.filter((item) =>  item !== todo);
      this.setState({ todos: deletedTodo });
      // Alternative:
      // const deletedTodo = this.state.todos.filter((item) => item !== this.state.todos[index]);
      // this.setState({ todos: deletedTodo })
   }

/* STEPS:
 1) Within the App component, map through each todo item and render each todo from our child ToDo component.
 2) Each todo item will have a description, an isCompleted checkbox, and an onChange function called toggleComplete.
 3) toggleComplete accepts the index of each todo, and when a change is detected on each one, will toggle true <--> false.
 4) The form's input will take a value of this.state.newTodoDescription and an onChange event of this.handleChange(e).
 5) When text is added to the input, this.state.newToDoDescription is set to whatever the text value is.
 6) Then, the onChange event calls this.handleChange(e), which will call setState to bind the value of the user input to this.state.newToDoDescription.
 7) Now that the input value of the new todo is bound to this.state.newTodoDescription, when we submit our item, we call this.handleSubmit(e) using onSubmit to bind it to our ToDo component, and ultimately our UI.
*/

   render() {
      return (
        <div className="App">
            <ul>
               { this.state.todos.map( (todo, index) =>
                  <ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) } deleteTodo ={ () => this.deleteTodo(index) } />
               )}
            </ul>
            <form onSubmit={ (e) => this.handleSubmit(e) }>
               <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) }/>
               <input type="submit" />
            </form>
         </div>
      )
    }
}

export default App;

/*
// Checkpoint 2.7: State & Props //

Step 1: Define constructor function that calls super (its parent's constructor) and own constructor.
Step 2: Define this.state as an array of to-do objects with properties of 'description' and 'isCompleted'.
Step 3: Display the to-dos within this.state using .map(), returning a new array of each item. Enclose the call to map with { }, which tells JSX to evaluate the code between braces as JS. For React to operate properly, each child of an array or iterator needs to have a key with a unique value. Specify a 'key' attribute on ToDo equal to each item's index. This gives us a unique identifier for each item.

// Checkpoint 2.8: Events //

--STEP 1--
***GOALS:
* Respond to changes to the checkbox input in a ToDo component by changing values in the App component's state.
* Create a child component (ToDo) that calls a function of a parent component (App) in response to an event (toggleComplete).

- To do this we must add an event handler on the parent component, App, so it can pass the event handler down to the child component, ToDo as a prop.
- Create toggleComplete() component an pass it as a prop to ToDo. Instead of passing it directly, we wrap it in an anonymous function, which allows us to pass the handler to the to-do's index, which we can use to modify the appropriate to-do.
- In the render function of our ToDo component, we create an event handler with onChange and pass it this.props.toggleComplete as a value. These steps ultimately allows us to call toggleComplete() each particular to-do item.

--STEP 2--
***GOALS:
* Update State using setState.
* The toggleComplete() function should accept index as a parameter and switch the isCompleted property of the target to-do from true to false (or vice versa) in state.

- To do this, we  modify the App component's state. This should not be done directly per React's guidelines.
- Thus, we must use this.setState() and pass it a new state object, triggering a rerender of the UI. This ensures that the UI and the state are always in sync.
- 1) Save a shallow copy of the todos array using splice().
- 2) Save a copy of the todo at the current index. When we call this.toggleComplete(index), the current index is defined by the index of each todo we are mapping over.
- 3) Use a ternary operator to toggle todo.isCompleted for each todo.
- 4) Use setState to update this.state.todos to the shallow, and modified copy of our todo list.
- 5) We have successfully rerendered our UI to reflect our updated state.

--STEP 3--
***GOALS:
* User should be able to submit new to-do items.
* Respond to form submissions using onSubmit.

- Add a form for new user-generated to-do items. Add an onSubmit attribute to <form> with a value of an arrow function that accepts e as a parameter and calls this.handleSubmit(e). (e) for 'event' contains event data passed to the function by the browser.
- We use an arrow function instead of giving this.handleSubmit as a value to preserve the value of 'this'. Arrow functions treat 'this' as a lexically scoped variable rather than a dynamic one. Class methods are not bound by default, so we must bind 'this' to them. ***** --> CLARIFY IN MENTOR SESSION

--STEP 4--
***GOALS:
* Capture the text input value and bind it to a property in this.state.
* Create a new to-do by capturing the text input value and storing it in the state object.

- Define a new property on this.state, newTodoDescription, and set the value equal to an empty string.
- Add a prop of 'value' equal to this.state.newTodoDescription on the text input.
- Since this.state.newTodoDescription is bound to the empty string, we must obtain the text input value and use setState() to set its value in state to be reflected in the UI.
- To do this, we must add an event listener on the input using onChange that calls an arrow function (e) => this.handleChange(e).
- Sine we are calling handleChange, we define this as a class method, which accepts e as a parameter.
- Finally use setState to set the state of newTodoDescription to e.target.value (i.e., the value of the text input).
- When calling setState, we do not need to pass the entire object, only the oject's property or properties we wish to modify.
- This is because setState() automatically merges a partial state into the current state, thus we only need to call it with the changed/updated parts.
- We have successfully bound the value of the text input to this.state.newTodoDescription.

--Step 4--
***GOALS:
* Add the new to-do item(s)

- This will be done via the handleSubmit() method.
- On submit, we want a new to-do item to be added to this.state.todos.
- Create a new todo object and use this.setState() to add it to this.state.todos.
- To make sure we don't directly mutate state, we use JavaScript 'spread syntax' to pass setState to a new array, with our new todo object added to the end of it.

--Step 5--
***GOALS:
* User should not be able to add empty todos to state/UI.
* Text input value should clear after each submit.

- Within handleSubmit(), if no input in text field, return.
- Within handleSubmit(), set value of this.state.newTodoDescription to an empty string when calling setState().


FOR MENTOR SESSION:
1) Clarify why we must bind 'this' to events.
2) Clarify Controlled components - specifically with multiple inputs.

*/

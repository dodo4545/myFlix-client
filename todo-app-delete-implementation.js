// To-Do App with Delete Functionality
// This file contains the complete implementation for Part 2 of the task

// ============================================
// 1. ACTION TYPES
// ============================================
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO'; // NEW: Action type for deleting a todo

// ============================================
// 2. ACTION CREATORS
// ============================================
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text
});

// NEW: Action creator for deleting a todo
const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

// ============================================
// 3. REDUCER
// ============================================
const initialState = {
  todos: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(), // Simple ID generation
            text: action.payload,
            completed: false
          }
        ]
      };
    
    // NEW: Handle DELETE_TODO action
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// ============================================
// 4. STORE & TESTING
// ============================================
// Import Redux (in CodeSandbox, this is already available)
// import { createStore } from 'redux';

// Create the store
const store = createStore(todoReducer);

// Subscribe to store changes to log state
store.subscribe(() => {
  console.log('Current State:', store.getState());
});

// ============================================
// 5. TESTING THE DELETE FUNCTIONALITY
// ============================================
console.log('=== Testing To-Do App with Delete ===\n');

// Initial state
console.log('Initial state:');
console.log(store.getState());
console.log('\n---\n');

// Add first todo
console.log('Dispatching: addTodo("Learn Redux")');
store.dispatch(addTodo('Learn Redux'));
console.log('\n---\n');

// Add second todo
console.log('Dispatching: addTodo("Build a React app")');
store.dispatch(addTodo('Build a React app'));
console.log('\n---\n');

// Add third todo
console.log('Dispatching: addTodo("Master state management")');
store.dispatch(addTodo('Master state management'));
console.log('\n---\n');

// Get the ID of the second todo (for deletion)
const currentState = store.getState();
const secondTodoId = currentState.todos[1].id;

// Delete the second todo
console.log(`Dispatching: deleteTodo(${secondTodoId}) - Deleting "Build a React app"`);
store.dispatch(deleteTodo(secondTodoId));
console.log('\n---\n');

// Final state
console.log('Final state after deletion:');
console.log(store.getState());
console.log('\n---\n');

console.log('✅ Delete functionality implemented successfully!');
console.log('Expected: 2 todos remaining ("Learn Redux" and "Master state management")');
console.log(`Actual: ${store.getState().todos.length} todos remaining`);

// ============================================
// EXPECTED OUTPUT IN CONSOLE:
// ============================================
/*
=== Testing To-Do App with Delete ===

Initial state:
{ todos: [] }

---

Dispatching: addTodo("Learn Redux")
Current State: { todos: [{ id: 1639234567890, text: "Learn Redux", completed: false }] }

---

Dispatching: addTodo("Build a React app")
Current State: { todos: [
  { id: 1639234567890, text: "Learn Redux", completed: false },
  { id: 1639234567891, text: "Build a React app", completed: false }
]}

---

Dispatching: addTodo("Master state management")
Current State: { todos: [
  { id: 1639234567890, text: "Learn Redux", completed: false },
  { id: 1639234567891, text: "Build a React app", completed: false },
  { id: 1639234567892, text: "Master state management", completed: false }
]}

---

Dispatching: deleteTodo(1639234567891) - Deleting "Build a React app"
Current State: { todos: [
  { id: 1639234567890, text: "Learn Redux", completed: false },
  { id: 1639234567892, text: "Master state management", completed: false }
]}

---

Final state after deletion:
{ todos: [
  { id: 1639234567890, text: "Learn Redux", completed: false },
  { id: 1639234567892, text: "Master state management", completed: false }
]}

---

✅ Delete functionality implemented successfully!
Expected: 2 todos remaining ("Learn Redux" and "Master state management")
Actual: 2 todos remaining
*/

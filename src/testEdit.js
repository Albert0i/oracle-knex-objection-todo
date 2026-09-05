import db from './db.js';
import blessed from 'blessed';
import Todo from './models/Todo.js'; // Objection.js model

const editTodo = async (id) => {
  // Fetch the todo from Oracle
  const todo = await Todo.query().findById(id);
  if (!todo) {
    console.log('Todo not found.');
    return;
  }

  // Create a Blessed screen
  const screen = blessed.screen({
    smartCSR: true,
    title: 'Edit Todo'
  });

  // Create a textbox with the current value
  const textbox = blessed.textbox({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '80%',
    height: 3,
    label: `Editing Todo #${id}`,
    border: 'line',
    inputOnFocus: true,
    value: todo.title // pre-fill with existing value
  });

  // Focus the textbox so user can edit immediately
  textbox.focus();

  // Handle Enter key to save changes
  textbox.on('submit', async (newValue) => {
    const updated = await Todo.query().patchAndFetchById(id, { title: newValue });
    console.log('Updated Todo:', updated);
    process.exit(0);
  });

  // Allow quitting with Escape or Ctrl+C
  screen.key(['escape', 'C-c'], () => process.exit(0));

  // Render the screen
  screen.render();
};

// Example usage
editTodo(1);

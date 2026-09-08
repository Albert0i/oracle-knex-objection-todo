/**
 * todos.js 
 */
import readline from 'readline';
import db from './db.js';
import Todo from './models/Todo.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.clear();
  console.log("+----------------------------------+");
  console.log("|        Stuart's Todo List        |");
  console.log("+----------------------------------+");
  console.log("1) List todos");
  console.log("2) Add todo");
  console.log("3) Change todo");
  console.log("4) Toggle todo");
  console.log("5) Delete todo");
  console.log("6) Delete all todos (Danger)");
  console.log("7) Exit");
  rl.question("\nEnter a number (1-7): ", handleChoice);
}

async function handleChoice(choice) {
  switch (choice.trim()) {
    case '1':
      await listTodos();
      break;
    case '7':
      console.log("Goodbye!");
      rl.close();
      await db.destroy();   // close Oracle connections
      break;
    default:
      console.log(`You selected option ${choice}`);
      pressAnyKey();
      break;
  }
}

async function listTodos() {
  console.clear();
  try {
    const todos = await Todo.query();   // query all rows from TODO_LIST
    console.log("ID | Title        | Status");
    console.log("-- | ------------ | --------");
    todos.forEach(t => {
      console.log(`${t.id}  | ${t.title.padEnd(12)} | ${t.status}`);
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
  pressAnyKey();
}

function pressAnyKey() {
  console.log("\nPress Enter to continue...");
  rl.once('line', () => {
    showMenu();
  });
}

// Start the program
showMenu();

/**
 * todos.js 
 */
import readline from 'readline';
import db from './db.js';
import Todo from './models/Todo.js';

const SCREEN_WIDTH = 80
const SCREEN_TITLE = "Stuart's Todo List"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.clear();
  showBanner();

  console.log(" 1) List todos");
  console.log(" 2) Add todo");
  console.log(" 3) Change todo");
  console.log(" 4) Toggle todo");
  console.log(" 5) Delete todo");
  console.log(" 6) Delete all todos (Danger)");
  console.log(" 7) Exit");
  rl.question(" \nEnter a number (1-7): ", handleChoice);
}

async function handleChoice(choice) {
  switch (choice.trim()) {
    case '1':
      await listTodos();
      break;
    case '2': 
      await addTodo();
      break; 
    case '3': 
      await changeTodo();
      break; 
    case '4': 
      await toggleTodo();
      break; 
    case '5': 
      await deleteTodo();
      break;
    case '6': 
      await deleteAllTodos(); 
      break;          
    case '7':
      await exitProgram();
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
    const todos = await Todo.query().orderBy('ID');

    const idWidth = Math.max("ID".length, ...todos.map(t => String(t.id).length));
    const statusWidth = Math.max("Status".length, ...todos.map(t => t.status.length));
    let titleWidth = Math.max("Title".length, ...todos.map(t => t.title.length));

    const maxWidth = 80;
    let totalWidth = 2 + idWidth + 3 + titleWidth + 3 + statusWidth + 2;

    if (totalWidth > maxWidth) {
      const available = maxWidth - (2 + idWidth + 3 + statusWidth + 3 + 2);
      titleWidth = Math.max(5, available);
      totalWidth = idWidth + 3 + titleWidth + 3 + statusWidth;
    }

    function formatCell(str, width) {
      if (str.length > width) {
        return str.slice(0, width - 3) + "...";
      }
      return str.padEnd(width, " ");
    }

    // Banner
    showBanner();

    // Header + separator
    const header = "| " +
                   formatCell("ID", idWidth) + " | " +
                   formatCell("Title", titleWidth) + " | " +
                   formatCell("Status", statusWidth) + " |";
    const separator = "|" +
                      "-".repeat(idWidth + 2) + "+" +
                      "-".repeat(titleWidth + 2) + "+" +
                      "-".repeat(statusWidth + 2) + "|";

    console.log(separator);
    console.log(header);
    console.log(separator);

    // Rows
    todos.forEach(t => {
      console.log(
        "| " +
        formatCell(String(t.id), idWidth) + " | " +
        formatCell(t.title, titleWidth) + " | " +
        formatCell(t.status, statusWidth) + " |"
      );
    });

    console.log(separator);
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
  pressAnyKey();
}

async function addTodo() {
  console.clear();
  showBanner();
  showBanner("Add a New Todo", 40);

  rl.question("\nEnter todo title: ", async (title) => {
    try {
      if (!title.trim()) {
        console.log("Title cannot be empty.");
      } else {
        await Todo.query().insert({
          title: title.trim(),
          status: "PENDING"
        });
        console.log(`Added todo: "${title.trim()}"`);
      }
    } catch (err) {
      console.error("Error adding todo:", err);
    }
    pressAnyKey();
  });
}

async function changeTodo() {
  console.clear();
  showBanner("Change Todo Title", 40);

  try {
    const todos = await Todo.query();

    if (todos.length === 0) {
      console.log("No todos available.");
      return pressAnyKey();
    }

    rl.question("\nEnter the ID of the todo to change: ", async (idStr) => {
      const id = parseInt(idStr, 10);
      if (isNaN(id)) {
        console.log("Invalid ID.");
        return pressAnyKey();
      }

      try {
        const todo = await Todo.query().findById(id);
        if (!todo) {
          console.log(`No todo found with ID ${id}.`);
          return pressAnyKey();
        }

        // Show details
        console.log("\nTodo details:");
        console.log(`ID: ${todo.id}`);
        console.log(`Title: ${todo.title}`);
        console.log(`Status: ${todo.status}`);
        console.log(`Created At: ${todo.createdAt}`);

        // Ask for new title
        rl.question("\nEnter new title: ", async (newTitle) => {
          if (!newTitle.trim()) {
            console.log("Title cannot be empty.");
            return pressAnyKey();
          }

          // Confirm change (default Yes)
          rl.question(`\nConfirm change title to "${newTitle.trim()}"? [Y/n]: `, async (answer) => {
            const normalized = answer.trim().toLowerCase();
            if (normalized === "" || normalized === "y") {
              try {
                const updated = await Todo.query().patchAndFetchById(id, { title: newTitle.trim() });
                if (updated) {
                  console.log(`Todo with ID ${id} title changed successfully.`);
                } else {
                  console.log("Error: update did not occur.");
                }
              } catch (err) {
                console.error("Error updating todo:", err);
              }
            } else {
              console.log("Change cancelled.");
            }
            pressAnyKey();
          });
        });
      } catch (err) {
        console.error("Error fetching todo:", err);
        pressAnyKey();
      }
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
    pressAnyKey();
  }
}

async function toggleTodo() {
  console.clear();
  showBanner("Toggle Todo", 40);

  try {
    const todos = await Todo.query();

    if (todos.length === 0) {
      console.log("No todos available.");
      return pressAnyKey();
    }

    rl.question("\nEnter the ID of the todo to toggle: ", async (idStr) => {
      const id = parseInt(idStr, 10);
      if (isNaN(id)) {
        console.log("Invalid ID.");
        return pressAnyKey();
      }

      try {
        const todo = await Todo.query().findById(id);
        if (!todo) {
          console.log(`No todo found with ID ${id}.`);
          return pressAnyKey();
        }

        // Show details
        console.log("\nTodo details:");
        console.log(`ID: ${todo.id}`);
        console.log(`Title: ${todo.title}`);
        console.log(`Status: ${todo.status}`);
        console.log(`Created At: ${todo.createdAt}`);

        // Ask for confirmation (default Yes)
        rl.question("\nConfirm toggle status? [Y/n]: ", async (answer) => {
          const normalized = answer.trim().toLowerCase();          
          if (normalized === "" || normalized === "y") {
            try {
              const newStatus = todo.status === "PENDING" ? "COMPLETED" : "PENDING";
              const updated = await Todo.query().patchAndFetchById(id, { status: newStatus });
              if (updated) {
                console.log(`Todo with ID ${id} status toggled to ${newStatus}.`);
              } else {
                console.log("Error: toggle did not occur.");
              }
            } catch (err) {
              console.error("Error toggling todo:", err);
            }
          } else {
            console.log("Toggle cancelled.");
          }
          pressAnyKey();
        });
      } catch (err) {
        console.error("Error fetching todo:", err);
        pressAnyKey();
      }
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
    pressAnyKey();
  }
}

async function deleteTodo() {
  console.clear();
  showBanner("Delete Todo", 40);

  try {
    const todos = await Todo.query();

    if (todos.length === 0) {
      console.log("No todos to delete.");
      return pressAnyKey();
    }

    // Prompt for ID
    rl.question("\nEnter the ID of the todo to delete: ", async (idStr) => {
      const id = parseInt(idStr, 10);
      if (isNaN(id)) {
        console.log("Invalid ID.");
        return pressAnyKey();
      }

      try {
        const todo = await Todo.query().findById(id);
        if (!todo) {
          console.log(`No todo found with ID ${id}.`);
          return pressAnyKey();
        }

        // Show details
        console.log("\nTodo details:");
        console.log(`ID: ${todo.id}`);
        console.log(`Title: ${todo.title}`);
        console.log(`Created At: ${todo.createdAt}`);
        console.log(`Status: ${todo.status}`);

        // Ask for confirmation
        rl.question("\nAre you sure you want to delete this todo? [y/N]: ", async (answer) => {
          if (answer.trim().toLowerCase() === "y") {
            try {
              const deleted = await Todo.query().deleteById(id);
              if (deleted) {
                console.log(`Todo with ID ${id} deleted successfully.`);
              } else {
                console.log("Error: deletion did not occur.");
              }
            } catch (err) {
              console.error("Error deleting todo:", err);
            }
          } else {
            console.log("Deletion cancelled.");
          }
          pressAnyKey();
        });
      } catch (err) {
        console.error("Error fetching todo:", err);
        pressAnyKey();
      }
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
    pressAnyKey();
  }
}

async function deleteAllTodos() {
  console.clear();
  showBanner("Delete All Todos", 40);

  try {
    const todos = await Todo.query();
    const count = todos.length;

    if (count === 0) {
      console.log("No todos to delete.");
      return pressAnyKey();
    }

    console.log(`There are currently ${count} todos in the database.`);

    // Ask for confirmation (default No)
    rl.question("\nAre you sure you want to delete ALL todos? [y/N]: ", async (answer) => {
      const normalized = answer.trim().toLowerCase();
      if (normalized === "y") {
        try {
          const deleted = await Todo.query().delete();
          if (deleted) {
            // Reset the sequence to start at 1
            await db.raw('ALTER SEQUENCE "todo_list_seq" RESTART START WITH 1');
            
            console.log(`All ${count} todos deleted successfully.`);
          } else {
            console.log("Error: deletion did not occur.");
          }
        } catch (err) {
          console.error("Error deleting todos:", err);
        }
      } else {
        console.log("Deletion cancelled.");
      }
      pressAnyKey();
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
    pressAnyKey();
  }
}

async function exitProgram() {
  try {
    await db.destroy();      // close Oracle connections
  } catch (err) {
    console.error("Error closing database:", err);
  }

  rl.close();                // release readline
  showDisclaimer();          // framed disclaimer
  console.log("\nGoodbye!");
  process.exit(0);           // terminate program cleanly
}

function showBanner(title = SCREEN_TITLE, width = SCREEN_WIDTH) {
  // Ensure banner is at least as wide as the title + padding
  const bannerWidth = Math.max(width, title.length + 4);
  const topLine = "+" + "-".repeat(bannerWidth - 2) + "+";
  const middleLine = "| " + title
    .padStart(((bannerWidth - 4 + title.length) / 2), " ")
    .padEnd(bannerWidth - 3, " ") + "|";

  console.log(topLine);
  console.log(middleLine);
  console.log(topLine);
}

function showDisclaimer() {
  const width = 80;
  const topLine = "+" + "-".repeat(width - 2) + "+";

  const lines = [
    "DISCLAIMER:",
    " ", 
    "This software was generated with the assistance of AI (Copilot).",
    "It is provided strictly on an \"as is\" basis, without warranties of any kind,",
    "whether express or implied, including but not limited to merchantability,",
    "fitness for a particular purpose, or non-infringement.",
    " ",
    "The author and Copilot assume no responsibility or liability for any loss of",
    "data, damages, or consequences arising from the use of this program.",
    "By continuing, you acknowledge that you use this software entirely at your",
    "own risk and discretion."
  ];

  console.log(topLine);
  lines.forEach(line => {
    const padded = " " + line.padEnd(width - 3, " ");
    console.log("|" + padded + "|");
  });
  console.log(topLine);
}

function pressAnyKey() {
  console.log("\nPress Enter to continue...");
  rl.once('line', () => {
    showMenu();
  });
}

// Start the program
showMenu();

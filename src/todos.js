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
    case '7':
      await db.destroy();   // close Oracle connections  
      rl.close();
      showDisclaimer();
      console.log("Goodbye!");
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

/**
 * 📦 JavaScript Practice Projects & Logic Tasks
 * Master file to run multiple exercises interactively
 */

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

/**
 * Show main menu
 */
function showMenu() {
  console.log(`
===============================
🧩 JavaScript Practice Menu
===============================
 1️⃣  Grocery List CLI App
 2️⃣  Sum Two Numbers
 3️⃣  Reverse a String
 4️⃣  Check Even or Odd
 5️⃣  To-Do List App
 6️⃣  Nested User Object
 7️⃣  Find Maximum in Array
 8️⃣  Remove Duplicates from Array
 9️⃣  Capitalize Each Word
🔟  Check Palindrome
11️⃣ Double Numbers (Arrow Function)
12️⃣ Check if Number is Prime
13️⃣ Sort Strings by Length
14️⃣ Find Missing Number (1 to N)
15️⃣ Exit
--------------------------------
`);

  rl.question('👉 Enter your choice (1-15): ', choice => {
    switch (choice.trim()) {
      case '1': groceryListApp(); break;
      case '2': sumTwoNumbers(); break;
      case '3': reverseString(); break;
      case '4': checkEvenOrOdd(); break;
      case '5': todoListApp(); break;
      case '6': nestedUserObject(); break;
      case '7': findMaxInArray(); break;
      case '8': removeDuplicates(); break;
      case '9': capitalizeWords(); break;
      case '10': checkPalindrome(); break;
      case '11': doubleNumbersArrow(); break;
      case '12': checkPrimeNumber(); break;
      case '13': sortStringsByLength(); break;
      case '14': findMissingNumber(); break;
      case '15': console.log('👋 Exiting... Goodbye!'); rl.close(); break;
      default:
        console.log('⚠️ Invalid choice. Please enter a number between 1 and 15.');
        showMenu();
        break;
    }
  });
}

/**
 * 🛒 1. Grocery List CLI App
 */
function groceryListApp() {
  console.log('\n=== 🛒 Grocery List CLI App ===');
  let list = [];
  function addItem() {
    rl.question('Add item (type "done" to finish): ', input => {
      if (input.trim().toLowerCase() === 'done') {
        console.log('✅ Your Grocery List:', list);
        showMenu();
      } else {
        list.push(input.trim());
        addItem();
      }
    });
  }
  addItem();
}

/**
 * ➕ 2. Sum Two Numbers
 */
function sumTwoNumbers() {
  console.log('\n=== ➕ Sum Two Numbers ===');
  rl.question('Enter first number: ', first => {
    rl.question('Enter second number: ', second => {
      const sum = Number(first) + Number(second);
      console.log(`✅ Result: ${first} + ${second} = ${sum}`);
      showMenu();
    });
  });
}

/**
 * 🔄 3. Reverse a String
 */
function reverseString() {
  console.log('\n=== 🔄 Reverse a String ===');
  rl.question('Enter a string: ', input => {
    const reversed = input.split('').reverse().join('');
    console.log(`✅ Reversed String: ${reversed}`);
    showMenu();
  });
}

/**
 * 🔢 4. Check Even or Odd
 */
function checkEvenOrOdd() {
  console.log('\n=== 🔢 Check Even or Odd ===');
  rl.question('Enter a number: ', num => {
    console.log(Number(num) % 2 === 0 ? '✅ It is Even' : '✅ It is Odd');
    showMenu();
  });
}

/**
 * ✅ 5. To-Do List CLI App
 */
function todoListApp() {
  console.log('\n=== ✅ To-Do List CLI App ===');
  let tasks = [];
  function todoMenu() {
    console.log('\n1️⃣ Add Task\n2️⃣ Show Tasks\n3️⃣ Back to Main Menu');
    rl.question('Choose an option: ', option => {
      if (option === '1') {
        rl.question('Enter task: ', task => {
          tasks.push(task.trim());
          todoMenu();
        });
      } else if (option === '2') {
        console.log('📋 Your To-Do List:');
        tasks.forEach((task, i) => console.log(`${i+1}. ${task}`));
        todoMenu();
      } else {
        showMenu();
      }
    });
  }
  todoMenu();
}

/**
 * 🧱 6. Nested User Object
 */
function nestedUserObject() {
  console.log('\n=== 🧱 Nested User Object ===');
  let user = { name: '', age: 0, contact: { email: '', phone: '' } };
  rl.question('Enter your name: ', name => {
    user.name = name.trim();
    rl.question('Enter your age: ', age => {
      user.age = Number(age);
      rl.question('Enter your email: ', email => {
        user.contact.email = email.trim();
        rl.question('Enter your phone: ', phone => {
          user.contact.phone = phone.trim();
          console.log('✅ User Data:', user);
          showMenu();
        });
      });
    });
  });
}

/**
 * 📈 7. Find Maximum in Array
 */
function findMaxInArray() {
  console.log('\n=== 📈 Find Maximum in Array ===');
  rl.question('Enter numbers separated by space: ', input => {
    const numbers = input.split(' ').map(Number);
    const max = Math.max(...numbers);
    console.log(`✅ Maximum number: ${max}`);
    showMenu();
  });
}

/**
 * 🧹 8. Remove Duplicates from Array
 */
function removeDuplicates() {
  console.log('\n=== 🧹 Remove Duplicates ===');
  rl.question('Enter items separated by space: ', input => {
    const unique = [...new Set(input.split(' '))];
    console.log('✅ Unique items:', unique);
    showMenu();
  });
}

/**
 * 🔤 9. Capitalize Each Word
 */
function capitalizeWords() {
  console.log('\n=== 🔤 Capitalize Each Word ===');
  rl.question('Enter a sentence: ', sentence => {
    const capitalized = sentence
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    console.log('✅ Capitalized:', capitalized);
    showMenu();
  });
}

/**
 * 🔍 10. Check Palindrome
 */
function checkPalindrome() {
  console.log('\n=== 🔍 Check Palindrome ===');
  rl.question('Enter a string: ', str => {
    const clean = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const isPalindrome = clean === clean.split('').reverse().join('');
    console.log(isPalindrome ? '✅ It is a palindrome' : '❌ Not a palindrome');
    showMenu();
  });
}

/**
 * 🧮 11. Double Numbers (Arrow Function)
 */
function doubleNumbersArrow() {
  console.log('\n=== 🧮 Double Numbers ===');
  rl.question('Enter numbers separated by space: ', input => {
    const doubled = input.split(' ').map(n => Number(n) * 2);
    console.log('✅ Doubled:', doubled);
    showMenu();
  });
}

/**
 * 📏 12. Check if Number is Prime
 */
function checkPrimeNumber() {
  console.log('\n=== 📏 Check if Number is Prime ===');
  rl.question('Enter a number: ', n => {
    n = Number(n);
    let isPrime = n > 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) { isPrime = false; break; }
    }
    console.log(isPrime ? '✅ Prime Number' : '❌ Not a Prime Number');
    showMenu();
  });
}

/**
 * 🪄 13. Sort Strings by Length
 */
function sortStringsByLength() {
  console.log('\n=== 🪄 Sort Strings by Length ===');
  rl.question('Enter words separated by space: ', input => {
    const sorted = input.split(' ').sort((a, b) => a.length - b.length);
    console.log('✅ Sorted by length:', sorted);
    showMenu();
  });
}

/**
 * 🧩 14. Find Missing Number (1 to N)
 */
function findMissingNumber() {
  console.log('\n=== 🧩 Find Missing Number in Sequence ===');
  rl.question('Enter numbers separated by space (missing one): ', input => {
    const arr = input.split(' ').map(Number);
    const n = arr.length + 1;
    const expectedSum = n * (n + 1) / 2;
    const actualSum = arr.reduce((sum, num) => sum + num, 0);
    console.log(`✅ Missing number: ${expectedSum - actualSum}`);
    showMenu();
  });
}

// 🚀 Start the program
showMenu();

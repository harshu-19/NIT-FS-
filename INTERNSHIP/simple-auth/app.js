const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const prompt = require('prompt-sync')({ sigint: true }); // for input from user

// ✅ Connect to MongoDB database named 'authDB'
mongoose.connect('mongodb://127.0.0.1:27017/authDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection error:', err));

// ✅ Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// ✅ Create User model
const User = mongoose.model('User', userSchema);

// ✅ Function to register a new user (get details from human and store in database)
async function register() {
  const username = prompt('Choose a username: ');
  const password = prompt('Choose a password: ', { echo: '*' });

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    console.log('❌ Username already taken. Please choose another.');
    return;
  }

  // Hash password and save
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  console.log('✅ Registration successful! User details stored in database.');
}

// ✅ Function to login (check user details from database)
async function login() {
  const username = prompt('Username: ');
  const password = prompt('Password: ', { echo: '*' });

  const user = await User.findOne({ username });
  if (!user) {
    console.log('❌ User not found.');
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    console.log(`🎉 Welcome to this web page, ${user.username}!`);
  } else {
    console.log('❌ Incorrect password.');
  }
}

// ✅ Main menu
async function run() {
  console.log('\n=== Simple Auth App ===');
  console.log('1. Register (store new user details)');
  console.log('2. Login');
  const choice = prompt('Select option (1 or 2): ');

  if (choice === '1') {
    await register();
  } else if (choice === '2') {
    await login();
  } else {
    console.log('❌ Invalid option.');
  }

  mongoose.connection.close();
}

run();

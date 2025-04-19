const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Mock user data
const users = [
    { username: 'admin', password: 'password123' },
    { username: 'user1', password: 'mypassword' }
];

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., login.html)
app.use(express.static(__dirname));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.send(`<h1>Welcome, ${username}!</h1>`);
    } else {
        res.status(401).send('<h1>Invalid username or password</h1>');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
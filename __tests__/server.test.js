const request = require('supertest');
const express = require('express');

// Mock the app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Mock user data
const users = [
    { username: 'admin', password: 'password123' },
    { username: 'user1', password: 'mypassword' }
];

// Login route for testing
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.status(200).send(`Welcome, ${username}!`);
    } else {
        res.status(401).send('Invalid username or password');
    }
});

test('should return 200 for valid login', async () => {
    const response = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome, admin!');
});

test('should return 401 for invalid login', async () => {
    const response = await request(app)
        .post('/login')
        .send({ username: 'invalid', password: 'wrongpassword' });
    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid username or password');
});
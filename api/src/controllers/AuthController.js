require('dotenv').config();
const fs = require('fs');
const path = require('path');

const DB = path.join(__dirname, '../..', process.env.DB_FILE);

module.exports = {
  login(req, res) {
    const { email, password } = req.body;
    const { users } = JSON.parse(fs.readFileSync(DB, 'utf-8'))

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      delete user.password;

      res.json({ token: process.env.TOKEN, user });
    } else res.status(403).send('Invalid credentials');
  }
};

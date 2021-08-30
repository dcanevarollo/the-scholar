require('dotenv').config();
const fs = require('fs');
const path = require('path');

const DB = path.join(__dirname, '../..', process.env.DB_FILE);

module.exports = {
  update(req, res) {
    const id = req.url.split('/')[2];
    const data = JSON.parse(fs.readFileSync(DB, 'utf-8'))

    const user = data.users.find(u => u.id === id);

    if (user) {
      const { currentPassword, newPassword } = req.body;

      if (user.password === currentPassword) {
        user.password = newPassword;

        const index = data.users.findIndex(u => u.id === id);
        data.users[index] = user;

        fs.writeFileSync(DB, JSON.stringify(data));

        res.json();
      } else res.status(401).send('Current password is wrong');
    } else res.status(500).send('Internal error. Try again later');
  }
};

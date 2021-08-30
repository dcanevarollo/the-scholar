require('dotenv').config();
const fs = require('fs');
const path = require('path');

const DB = path.join(__dirname, '../..', process.env.DB_FILE);

function patchValue(req, res, next) {
  if (
    (req.method === 'PUT' || req.method === 'PATCH') &&
    req.url.search('users') >= 0
  ) {
    const urlSegments = req.url.split('/');

    const entity = urlSegments[1];
    const data = JSON.parse(fs.readFileSync(DB, 'utf-8'))[entity];

    const id = urlSegments[2];
    const row = data.find(r => r.id === id);

    const notUpdated = Object.keys(row).filter(
      k => !Object.keys(req.body).includes(k)
    );

    notUpdated.forEach(k => req.body[k] = row[k]);
  }

  next();
}

module.exports = patchValue;

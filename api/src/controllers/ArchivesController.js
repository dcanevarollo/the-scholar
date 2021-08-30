require('dotenv').config();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const DB = path.join(__dirname, '../..', process.env.DB_FILE);

module.exports = {
  upload(req, res) {
    const filesToSave = [];
    Object.keys(req.files).forEach(key => {
      const reqFiles =
        req.files[key] instanceof Array ? req.files[key] : [req.files[key]];

      const { id } = req.params;

      reqFiles.forEach(file => filesToSave.push({
        id: uuid.v4().substring(0, 7),
        name: file.name,
        path: file.path,
        type: file.type,
        createdAt: Date.now(),
        userId: id
      }));
    });

    const data = JSON.parse(fs.readFileSync(DB, 'utf-8'));
    filesToSave.forEach(f => data.archives.push(f));
    fs.writeFileSync(DB, JSON.stringify(data));

    res.json({ message: `${filesToSave.length} files uploaded` });
  },

  download(req, res) {
    const { id } = req.params;

    const { archives } = JSON.parse(fs.readFileSync(DB, 'utf-8'));
    const file = archives.find(a => a.id === id);

    if (file) res.download(`.\\${file.path}`, file.name);
    else res.status(404).send('File not found');
  },

  delete(req, res) {
    const { id } = req.params;

    const data = JSON.parse(fs.readFileSync(DB, 'utf-8'));
    const file = data.archives.find(a => a.id === id);

    if (file) {
      const index = data.archives.indexOf(file);
      if (index >= 0) data.archives.splice(index, 1);

      fs.unlinkSync(file.path);
      fs.writeFileSync(DB, JSON.stringify(data));

      res.json({});
    } else res.status(404).send('File not found');
  }
};

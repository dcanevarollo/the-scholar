const jsonServer = require('json-server');
const multipart = require('connect-multiparty');
const path = require('path');

const AuthController = require('./controllers/AuthController');
const NewPasswordController = require('./controllers/NewPasswordController');
const ArchivesController = require('./controllers/ArchivesController');
const authentication = require('./middlewares/authentication');
const patchValue = require('./middlewares/patchValue');
const secureRender = require('./utils/secureRender');

const PORT = 3000;
const DB = path.join(__dirname, '..', process.env.DB_FILE);

const server = jsonServer.create();
const router = jsonServer.router(DB);
const defaultMiddlewares = jsonServer.defaults();

server.use(defaultMiddlewares);
server.use(jsonServer.bodyParser);
server.use(authentication);
server.use(patchValue);

server.post('/auth', AuthController.login);
server.put('/new-password/:id', NewPasswordController.update);
server.post(
  '/upload/:id',
  multipart({ uploadDir: './uploads' }),
  ArchivesController.upload
);
server.get('/download/:id', ArchivesController.download);
server.delete('/archives/:id', ArchivesController.delete);

router.render = secureRender;

server.use(router);

server.listen(PORT, () => {
  console.info(`JSON Server is running at port ${PORT}`);
});

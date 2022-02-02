const [{ Server: h1 }, x] = [require('http'), require('express')];
const cluster = require('cluster');

let i = 0;
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %s died.', worker.process.pid);
  });
} else {
  const Router = x.Router();
  const PORT = 4321;
  const { log } = console;
  const hu = { 'Content-Type': 'text/html; charset=utf-8' };
  const app = x();
  Router
    .route('/')
    .get(r => r.res.end('Привет мир! ' + ' от ' + process.pid))
    .put(r => r.res.send(String(++i) + ' from ' + process.pid));
  app
    .use((r, rs, n) => rs.status(200).set(hu) && n())
    .use(x.static('.'))
    .use('/', Router)
    .use(({ res: r }) => r.status(404).end('Пока нет!'))
    .use((e, r, rs, n) => rs.status(500).end(`Ошибка: ${e}`))
    /* .set('view engine', 'pug') */
    .set('x-powered-by', false);
  const s = h1(app)
    .listen(process.env.PORT || PORT, () => log(process.pid));
}

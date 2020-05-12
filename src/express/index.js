'use strict';

const path = require(`path`);
const express = require(`express`);
const app = express();

const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates/pages`;

const MainRoutes = require(`./routes/main`);
const MyRoutes = require(`./routes/my`);
const ArticlesRoutes = require(`./routes/articles`);

const DEFAULT_PORT = 8080;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(`/`, MainRoutes);
app.use(`/my`, MyRoutes);
app.use(`/articles`, ArticlesRoutes);

app.use((_, res) => res.status(404).render(`errors/404`));

app.listen(DEFAULT_PORT, () =>
  console.log(`Сервер запущен на порту ${DEFAULT_PORT}`)
);

'use strict';

const express = require(`express`);
const app = express();

const MainRoutes = require(`./routes/main`);
const MyRoutes = require(`./routes/my`);
const ArticlesRoutes = require(`./routes/articles`);

const DEFAULT_PORT = 8080;

app.use(`/`, MainRoutes);
app.use(`/my`, MyRoutes);
app.use(`/articles`, ArticlesRoutes);

app.listen(DEFAULT_PORT, () =>
  console.log(`Сервер запущен на порту ${DEFAULT_PORT}`)
);

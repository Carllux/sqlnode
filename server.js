import app from './app';

const port = 3000;

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + CLICK em http://localhost:${port}`);
});

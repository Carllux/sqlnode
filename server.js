import app from './app.js';

const port = process.env.PORT;

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + CLICK em http://localhost:${port}${process.env.V1_URL}/`);
});

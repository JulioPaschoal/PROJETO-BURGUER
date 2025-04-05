import app from './app';
import 'dotenv/config';

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

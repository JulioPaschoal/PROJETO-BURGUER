import multer from 'multer';
import { v4 } from 'uuid';
import { extname, resolve } from 'node:path';

export default multer({
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callbacky) =>
      callbacky(null, v4() + extname(file.originalname)),
  }),
});

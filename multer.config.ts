import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  dest: './uploads',
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const name = file.originalname.split('.')[0];
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${name}-${randomName}${fileExtName}`);
    },
  }),
};

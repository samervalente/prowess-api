import { Injectable } from '@nestjs/common';
import { cloudinary } from '../../../../cloudinary.config';

@Injectable()
export class CloudinaryService {
  async upload(filename: string) {
    return await cloudinary.uploader.upload(`./uploads/${filename}`, {public_id: process.env.PUBLIC_ID});
  }
}

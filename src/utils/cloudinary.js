import cloudinary from 'cloudinary'
import * as dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
    cloud_name: "dkx50zaa5",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
  });

export default cloudinary.v2


import ImageKit from "imagekit";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
const privateKey = process.env.IMAGE_KIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGE_KIT_URLENDPOINT;

export const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export const uploadImageToCDN = async (image) => {
  try {
    image.buffer = fs.readFileSync(image.path);

    const response = await imagekit.upload({
      file: image.buffer,
      fileName: image.originalname, //required
    });
    fs.unlinkSync(image.path);
    return response;
  } catch (error) {
    console.log(error);
  }
};

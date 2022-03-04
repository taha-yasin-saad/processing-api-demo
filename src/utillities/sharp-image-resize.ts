import sharp from "sharp";

interface sharpResizeAtrs {
  imageName: string;
  fullImagePath: string;
  resizedImagePath: string;
  width: number;
  height: number;
}

const sharpResizeImage = async (sharpAtrs: sharpResizeAtrs) => {
  try {
    await sharp(sharpAtrs.fullImagePath)
      .resize(sharpAtrs.width, sharpAtrs.height)
      .jpeg()
      .toFile(sharpAtrs.resizedImagePath);
    console.log(`${sharpAtrs.imageName} converted`);
    return "";
  } catch {
    return "Image couldn't be resized";
  }
};

export default sharpResizeImage;

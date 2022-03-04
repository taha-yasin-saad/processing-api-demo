import sharp from "sharp";

interface sharpResizeAtrs {
  imageName: string;
  fullImagePath: string;
  resizedImagePath: string;
  width: number;
  height: number;
}

// sharp to resize the image
const sharpResizeImage = async (
  sharpAtrs: sharpResizeAtrs
): Promise<null | string> => {
  try {
    await sharp(sharpAtrs.fullImagePath)
      .resize(sharpAtrs.width, sharpAtrs.height)
      .toFormat("jpeg")
      .toFile(sharpAtrs.resizedImagePath);
    console.log("convert");
    return "";
  } catch {
    return "Image couldn't be resized";
  }
};

export default sharpResizeImage;

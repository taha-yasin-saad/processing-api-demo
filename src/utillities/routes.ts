import express from "express";
import path from "path";
import fs from "fs";
import sharpResizeImage from "./sharp-image-resize";

const routes = express.Router();

routes.get("/", (req, res) => {
  const msg = `<h2>Hello you can use the processing api </h2> 
    <ul>
    <li><a href="/api/full?filename=encenadaport">Full Image</a></li>
    <li><a href="/api/resized?filename=encenadaport&width=100&height=100">Resized Image</a></li>
    </ul>`;
  res.send(msg);
});

routes.get("/api/full?", (req, res) => {
  // resolve path
  const fullImage = path.resolve(
    __dirname,
    `../../images/full/${req.query.filename}.jpg`
  );

  // Reading the file
  fs.readFile(fullImage, function (err, content) {
    // Serving the image
    res.end(content);
  });
});

routes.get("/api/resize?", async (req, res) => {
  // resolve path
  const fullImagePath = path.resolve(
    __dirname,
    `../../images/full/${req.query.filename}.jpg`
  );
  const resizedImagePath = path.resolve(
    __dirname,
    `../../images/thumb/${req.query.filename}-${req.query.width}x${req.query.height}.jpg`
  );

  const imageName = String(req.query.filename);

  const imageWidth: number = parseInt(`${req.query.width}`);
  const imageHeight: number = parseInt(`${req.query.height}`);

  if (fs.existsSync(resizedImagePath)) {
    res.redirect(
      `/api/resized?filename=${req.query.filename}&width=${req.query.width}&height=${req.query.height}`
    );
  } else {
    await sharpResizeImage({
      imageName: imageName,
      fullImagePath: fullImagePath,
      resizedImagePath: resizedImagePath,
      width: imageWidth,
      height: imageHeight,
    });
    if (fs.existsSync(resizedImagePath)) {
      console.log("redirect again");

      res.redirect(
        `/api/resized?filename=${req.query.filename}&width=${req.query.width}&height=${req.query.height}`
      );
    } else {
      console.log("still not found");
    }
  }
});

routes.get("/api/resized?", (req, res) => {
  // resolve path
  const resizedImagePath = path.resolve(
    __dirname,
    `../../images/thumb/${req.query.filename}-${req.query.width}x${req.query.height}.jpg`
  );

  // Reading the file
  if (fs.existsSync(resizedImagePath)) {
    try {
      fs.readFile(resizedImagePath, function (err, content) {
        // Serving the image
        res.end(content);
      });
    } catch {
      return "image has not resized yet";
    }
  } else {
    console.log("redirect");

    res.redirect(
      `/api/resize?filename=${req.query.filename}&width=${req.query.width}&height=${req.query.height}`
    );
  }
});

export default routes;

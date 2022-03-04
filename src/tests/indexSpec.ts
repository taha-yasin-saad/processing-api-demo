import app from "../index";
import fs from "fs";
import path from "path";
import supertest from "supertest";

const request = supertest(app);

describe("Test response for endpoint: /", (): void => {
  it("gets /", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/");

    expect(response.status).toBe(200);
  });
});

describe("Test response for endpoint: /api/full (valid argument)", (): void => {
  it("gets /api/full?filename=encenadaport", async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      "/api/full?filename=encenadaport"
    );

    expect(response.status).toBe(200);
  });
});

describe("Test response for endpoint: /images", (): void => {
  it("returns 404 for invalid endpoint", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/images");

    expect(response.status).toBe(404);
  });
});

describe("Test response for endpoint to resized image found on the file system: /api/resized?filename=encenadaport&width=100&height=100 (valid argument)", (): void => {
  it("resized image found", async (): Promise<void> => {
    await request.get(
      "/api/resized?filename=encenadaport&width=100&height=100"
    );
    const thumbImgPath = path.resolve(
      __dirname,
      `../../images/thumb/encenadaport-100x100.jpg`
    );

    expect(fs.existsSync(thumbImgPath)).toBe(true);
  });
});

describe("Test the resize image Functionality on the file system: /api/resize?filename=encenadaport&width=100&height=100 (valid argument)", (): void => {
  it("image resized", async (): Promise<void> => {
    await request.get("/api/resize?filename=encenadaport&width=100&height=100");
    const thumbImgPath = path.resolve(
      __dirname,
      `../../images/thumb/encenadaport-100x100.jpg`
    );

    expect(fs.existsSync(thumbImgPath)).toBe(true);
  });
});

describe("Test response for endpoint to resize image that not found on the system: /api/full?filename=sky (valid argument)", (): void => {
  it("image is not on the system as full size to resized it", async (): Promise<void> => {
    await request.get("/api/full?filename=sky");
    const thumbImgPath = path.resolve(__dirname, `../../images/full/sky.jpg`);

    expect(!fs.existsSync(thumbImgPath)).toBe(true);
  });
});

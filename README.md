#### The scripts

- Install: `npm install`
- Build: `npm run build`
- Start server: `npm run start`
- Run tests: `npm run test`
- Lint: `npm run lint`
- Prettify: `npm run prettify`

#### Endpoint to resize images

http://localhost:3000/api/resize

Expected arguments are:

- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

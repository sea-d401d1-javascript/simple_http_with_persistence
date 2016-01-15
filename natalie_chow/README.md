## Simple HTTP server with data store
The HTTP server starts on port 3000 and listens for any `POST`/`GET` requests at `/teapot`.

> The server was first developed with if/else to handle routing; it is later refactored to use a Router constructor to redirect different endpoints. The original script called `server.js` is kept in the `/lib` directory for reference. However, `server_with_router.js` in the same folder is what the main application and test currently use.

#### `POST`
Data of any `POST` requests will be saved to a JSON file in the `/data` directory.

You can specify a filename with a trailing slash. If no filename is specified, the resulting JSON file will be named as the number of files posted thus far. For example, a `POST` request to `/teapot/troll` creates `data/troll.json`, while `POST`ing to `/teapot` results in `data/1.json` and so on.

#### `GET`
You can read the files in the `/data` directory with a `GET` request.

Specify the file you want to read in this format: `/teapot/:filename`. For instance, a `GET` request to `/teapot/troll` will return `data/troll.json` if that file exists. The server will respond with a 404 if you failed to specify a file or if the file specified does not exist.

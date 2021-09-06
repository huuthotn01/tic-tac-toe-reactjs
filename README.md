# Getting Started with React

This project is made to learn React, Node and Express.

## What's inside

The server is built by Node and its framework Express. The frontend is built by React and stored in `client` directory. Dependencies and other infos are declared in the json files. In addition to default modules, the app also use JQuery, Bootstrap and React-bootstrap. To download these modules, navigate to `client` directory and run `npm` commands.

`cd client`

`npm install jquery --save` 

`npm install react-bootstrap bootstrap --save`

The modules will be automatically written into the [package.json](package.json) file.

## Available Scripts

In the project root directory, you can run:

### `node server.js`

The server is built in file `server.js`. Run the above command to open the server and receive request from client. Without this command the app won't work. Now the server will listen at port 5000. Open [http://localhost:5000](http://localhost:5000/express_backend) to see the result.

After that, navigate to `client` directory:

`cd client`

and you can run these commands:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run build` fails to minify
# Load Monitoring Web Application

Display 

## Start project

The project is set to deploy and use independently both client and server.

Remember to install packages for both the paths:
```bash
cd client && yarn
cd server && yarn
```

To launch the app do:
```bash
yarn start:client
yarn start:server
```

## Client

Client is built upon React, to provide hot-reloading modules, integrated transpiling and devServer, functionalities passed from Webpack.

One of the main reason of this choice is, due to the small bundling size, possibility to bind markup and scripts using a MVVC pattern and split codebase in components.

## Server

The configuration is a simple express RestAPI served though Express.
No error handling is set.

Given more information about the scope of the project:

- It may be bundled with Electron or such like, to create a desktop application
- It may be configured as single common package.json to optimize caching on installation
- Include error loggings
  
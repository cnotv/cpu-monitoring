# Load Monitoring Web Application

Display CPU high load values.

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

## Further implementations

Given more information about the scope of the project:

- Add distribution configuration
- Correct/rethink time label
- Use existing UI Kit if any
- Probably find a better overload/recover UI, e.g.: another type of chart
- Include error loggings
- Add proper mocking libraries
- Add module federation, if Microfrontend
- Set Web Worker to avoid continuous scripts on the main thread
- It may be bundled with Electron or such like, to create a desktop application
- It may be configured as single common package.json to optimize caching on installation
  
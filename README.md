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

- Config
  - Add env or endpoint configuration, to change logging parameters as a real scenario
  - Add app distribution for CI
  - Set CORS configuration accordingly
  - Add module federation, if Microfrontend
  - It may be bundled with Electron or such like, to create a desktop application
- Code quality
  - Include error loggings for async requests
  - Add proper mocking libraries for testing
  - Set Web Worker to avoid continuous scripts on the main thread
- Cosmetic
  - Reverse log chart incremental
  - Correct or remove time label in the chart
  - Correct/rethink time label for CPU logs
  - Use existing UI Kit, if any
  - Find a better overload/recover UI, e.g.: another type of chart
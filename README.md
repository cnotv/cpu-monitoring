# Load Monitoring Web Application

Display CPU high load values.

## Functionality

After running both client and server, a state of the dashboard is created on page loaded, based on defined [configuration](client/src/config/cpu.tsx).

It also contain an initial state, which will then be updated.

The computation is done based on the size of the stored logs, defined in combination of the configuration of the project.

Alerts will then be visualized as logs and eventually the card highlighted.

Check [task requirements](/TASK.md) for further technical details.

## Start project

The project is set to deploy and use independently client and server.

Install packages:
```bash
cd client && yarn
cd server && yarn
```

Launch the app:
```bash
yarn start:client
yarn start:server
```

## Client

Client is built upon React, to provide hot-reloading modules, integrated transpiling and devServer, functionalities passed from Webpack.

One of the main reason of this choice is, due to the small bundling size, possibility to bind markup and scripts using a MVVC pattern and split codebase in components.

Rechart is then used as data viz, as it provides a simple configuration in React flavor.

## Server

The configuration is a simple express RestAPI endpoint, served though Express.

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
  - Lint and prettify code and style, including pre-commit and CI automation
  - Include error loggings for async requests
  - Add proper mocking libraries for testing
  - Set Web Worker to avoid continuous scripts on the main thread
- Cosmetic
  - Reverse log chart incremental
  - Correct or remove time label in the chart
  - Correct/rethink time label for CPU logs
  - Use existing UI Kit, if any
  - Find a better overload/recover UI, e.g.: another type of chart

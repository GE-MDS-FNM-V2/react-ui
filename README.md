# GE-MDS-FNM-V2
GE Field Network Manager V2

## Running locally
To run this locally you must first have node and npm installed on your machine.
You can follow the instructions here to do that: https://nodejs.org/en/download/

Then please run the following:
```
git clone https://github.com/GE-MDS-FNM-V2/frontend.git ~/Desktop/ge-frontend
cd ~/Desktop/ge-frontend
npm install -g yarn
yarn
yarn start
```

The above steps will clone the repository to your desktop, navigate you into 
the repo, install yarn (similar to npm - but made by facebook with some
additional features), install your dependencies within the package.json, 
and start up a local development server with automatic reloading on file changes

## Deployments (in the cloud and locally)
To deploy our webapp we use a service called ZEIT Now.
It is setup to automatically deploy every commit that is pushed to github on any
branch. You can see those deployments here: 
https://github.com/GE-MDS-FNM-V2/frontend/deployments.

The default master deployment is located here:
https://ge-fnm-v2-frontend.now.sh/

Now's integration also posts a comment on every commit it publishes. You can
find an example of this here: 
https://github.com/GE-MDS-FNM-V2/frontend/commit/f9f887b212d556b27d3974203c293ccf4bea6223

If you would like to deploy from your own commandline rather than pushing to 
github, you can use ZEIT's CLI tool to do that. The following should get you
started with that:
```
yarn add now
now
```
(Note: the now CLI tool requires you to login, however the CLI will instruct you
on how to do that yourself)

If you would like to 1-for-1 recreate a deployment to Zeit now locally, you can
do that by running:
```
now dev
```


## Available Create-React-App Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

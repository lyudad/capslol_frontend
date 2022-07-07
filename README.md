## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

If you want to specity port use variable PORT in .env

[about husky and lint-staged](https://dev.to/truemark/run-eslint-on-git-commit-with-husky-and-lint-staged-in-reactjs-4oeb)

## Technical Debt 

Pagination on the Talents page is currently working with frontend filtering, this is a bad practice and should be filtered on backend in the near future!
..capslol_frontend\src\pages\TalentsPage\index.tsx
..line 39 to 47  

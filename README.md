# Getting Started with Create React App

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


- To view the working test site, please visit [My Test Site](https://zomoto.hardmouse.com/).


- Repo is @ [Here in Github](https://github.com/hardmouse/react-zomoto). 

## Available Scripts

In the project directory, you can run:

### `npm i`

Install nodemodules as usuall.\


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## CORS issue

API usually has CORS issue in local development

### Solution 1

Use [https://cors-anywhere.herokuapp.com/](cors-anywhere@herokuapp). Need to open https://cors-anywhere.herokuapp.com/ and grant the access in local development. Then use 
```
https://cors-anywhere.herokuapp.com/{https://api.yelp.com/v3/businesses/search}
```
to access the API. 

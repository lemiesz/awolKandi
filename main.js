require.config({
  paths: {
    "react": "bower_components/react/react-with-addons",
    "babel": "bower_components/requirejs-react-jsx/babel-5.8.34.min",
    "jsx": "bower_components/requirejs-react-jsx/jsx",
    "text": "bower_components/requirejs-text/text"
  },

  shim : {
    "react": {
      "exports": "React"
    }
  },

  config: {
    babel: {
      sourceMaps: "inline", // One of [false, 'inline', 'both']. See https://babeljs.io/docs/usage/options/
      fileExtension: ".jsx" // Can be set to anything, like .es6 or .js. Defaults to .jsx
    }
  }
});

require(['jsx!app'], function(App){

  var app = new App();
  app.init();

});
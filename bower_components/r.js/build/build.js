/*
 * Create a build.js file that has the build options you want and pass that
 * build file to this file to do the build. See example.build.js for more information.
 */

/*jslint strict: false, nomen: false */
/*global require: false */

require({
  appDir: "./",
  baseUrl: "./",
  dir: "./compiled",
  mainConfigFile: "./main.js",

  optimize: "uglify2",
  skipDirOptimize: true,
  generateSourceMaps: true,
  findNestedDependencies: true,
  preserveLicenseComments: false,

  onBuildWrite: function (moduleName, path, singleContents) {
    return singleContents.replace(/jsx!/g, '');
  },

  modules: [
    {
      name: "main",
      exclude: ['jsx']
    }
  ]
});

My Project
---

Usage
---

Start the development server with this command:

```
npm start
```



Setup
---

```
npm install
```



Compile
---

```
npm run compile
```



# Breakdown of Node modules

## webpack
---

### Sass compilation to file

#### modules to install

- extract-text-webpack-plugin
- node-sass
- sass-loader
- css-loader
- style-loader

#### code for webpack.config.js

```
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ExtractCSS =  new ExtractTextPlugin('main.css');
// this would be added to plugins array

//added to loaders array
{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style', // The backup style loader
    'css?sourceMap!sass?sourceMap'
  )
}
```
#### add to your main react module
```
require("path/to/main.scss");
```

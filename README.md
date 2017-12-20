# sketch-plugin-boilerplate
Sketch plugin boilerplate using webview and react

## Basic Usage

Clone the repo: `git clone https://github.com/sue71/sketch-plugin-boilerplate my-plugin`

Change the plugin name defined in the package.json

```
"skpm": {
  "name": "sketch-plugin-boilerplate",
  "manifest": "src/sketch/manifest.json", 
  "main": "example.sketchplugin" // < plugin name
}
```

## Build

```
npm run build
```


// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": preferDefault(require("D:\\Proyectos\\SantaTracker\\src\\pages\\404.js")),
  "component---src-pages-about-js": preferDefault(require("D:\\Proyectos\\SantaTracker\\src\\pages\\about.js")),
  "component---src-pages-index-js": preferDefault(require("D:\\Proyectos\\SantaTracker\\src\\pages\\index.js"))
}


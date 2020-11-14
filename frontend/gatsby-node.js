const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  console.log("Page -", page.path)
  console.log(path.resolve("src/pages/product.js"))
  if (page.path.match(/^\/product/)) {
    page.matchPath = "/product/*"
    page.component = path.resolve("src/pages/product.js")
    createPage(page)
  }
}

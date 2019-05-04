/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const DocumentationUICreatePages = require('@ironstar/docs-engine/gatsby/createPages')
const DocumentationUIOnCreateNode = require('@ironstar/docs-engine/gatsby/onCreateNode')

exports.createPages = async gatsby => {
  try {
    await DocumentationUICreatePages(gatsby)

    const {
      actions: { createPage },
      graphql,
    } = gatsby

    // Custom page creation logic can be added here

    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

exports.onCreateNode = gatsby => {
  DocumentationUIOnCreateNode(gatsby)

  const { node, getNode, actions } = gatsby
  // Add custom node creation logic here!

  // const { createNodeField } = actions
  // if (node.internal.type === 'MarkdownRemark') {
  //   const questionSlug = createFilePath({ node, getNode, basePath: 'pages' })
  //   createNodeField({
  //     node,
  //     name: 'slug',
  //     value: questionSlug,
  //   })
  // }
}

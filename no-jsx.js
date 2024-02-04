
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "Use of JSX and UI components is not allowed"
    },
  },
  create: function(context) {
    return {
      "JSXElement": function(node) {
        context.report({ node: node.parent, message: "JSX not allowed" });
      }
    };
  }
};


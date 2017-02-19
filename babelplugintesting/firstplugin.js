
// find out more at https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-api



module.exports = function(babel) { // this comes from babel-core
    var t = babel.types;
    // plugin contents
    return {
        visitor: {
            // visitor contents
            // replace every '===' to '<>'
            BinaryExpression(path) {
                if(path.node.operator === '===') {
                    path.node.operator = '<>';
                }
                //console.log('path.node = ', path.node);
                return;
            },
            // change all arrays to reverse their contents
            ArrayExpression(path) {
                console.log('array had elements = ', path.node.elements);
                path.node.elements = path.node.elements.reverse();
                return;
            }
        }
    };
}


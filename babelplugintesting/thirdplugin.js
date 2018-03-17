
module.exports =  function(babel) {
    console.log('third plugin exported function called!');
    return {
        visitor: {
            // each function 
            // recvs two arguments: path and state
            TemplateLiteral(path, state) { 
                // something like `foo${bar}done`, where foo and done are quasis and bar is expressions
                //  console.log('got templateliteral: path.node = ', path.node);
                for(var qq of path.node.quasis) {
                    // each quasi is of type TemplateElement
                    console.log('got quasi: ', qq);
                }
            },
            // something like tagname`abc${bcde}`
            TaggedTemplateExpression(path, state) {
                console.log('got tte: path.node = ', path.node);
                return;
            }
        }
    }
}
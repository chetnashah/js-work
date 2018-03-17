
module.exports =  function(babel) {
    console.log('second plugin exported function called!');
    return {
        visitor: {
            // each function 
            // recvs two arguments: path and state
            Identifier(path, state) {
                if(path.node.name === 'foo') {
                    path.node.name = 'bar';
                }
                return;
            }
        }
    }
}
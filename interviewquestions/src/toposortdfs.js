

// [['A', 'B'], ['A', 'C'], ['A', 'D'], ['C', 'D']]
// ['B', 'D', 'C', 'A']

// dependency always resolves first in ordering!
function toposort(depArr) {
    const graph = {};
    const ans = [];
    for(let i=0; i< depArr.length; i++){
        const [dependent, dependency] = depArr[i];
        if(!graph[dependency]){
            graph[dependency] = [];
        }
        graph[dependency].push(dependent);// graph stores inverted edges so that ones with zero indeg are finished first
    }
    console.log(graph);

    let visited = {};
    function dfs(v) {
        console.log(v)
        visited[v] = 1;// visit start/exploring
        if(graph[v] && graph[v].length) {
            console.log(graph[v]);
            graph[v].forEach((val) => {
                if(!visited[val]) {
                    dfs(val);
                }
            });
        }
        ans.unshift(v);// put in a stack after visit complete
    }
    Object.keys(graph).forEach((key) => {
        console.log(key);
        if(!visited[key]){
            dfs(key);
        }
    });
    console.log(ans);
}

toposort([['A', 'B'], ['A', 'C'], ['A', 'D'], ['C', 'D'], ['E', 'D'], ['E', 'A']]);
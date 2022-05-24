

// [['A', 'B'], ['A', 'C'], ['A', 'D'], ['C', 'D']]
// ['B', 'D', 'C', 'A']

// dependency always resolves first in ordering!
function toposort(depArr) {
    // collect all nodes
    const nodes = new Set();
    const graph = {};
    const indeg = {};
    for(let i=0;i<depArr.length; i++) {
        const [dependent, dependency] = depArr[i];
        nodes.add(dependency);
        nodes.add(dependent);

        if(!graph[dependency]) {
            graph[dependency] =[];
        }
        graph[dependency].push(dependent);// directed edges from dependency to dependent, graph stored inverted edges from question as zero deg nodes resolve first
        if(!indeg[dependent]) {
            indeg[dependent] = 0;
        }
        indeg[dependent]++;
    }
    console.log(graph);
    const arrNodes = Array.from(nodes);
    console.log(arrNodes);
    const q = [];
    for(let j=0;j<arrNodes.length;j++){
        const node = arrNodes[j];
        if(!indeg[node]) {
            q.push(node);
        }
    }
    while(q.length>0){
        const out = q.shift();
        console.log('out = ', out);
        console.log(graph[out]);
        if(Array.isArray(graph[out])){
            graph[out].forEach((item) => {
                console.log(item);
                indeg[item]--;
                if(indeg[item] <= 0) {
                    q.push(item);
                }
            });
        }
        console.log(out);
    }
}

toposort([['A', 'B'], ['A', 'C'], ['A', 'D'], ['C', 'D'], ['E', 'D'], ['E', 'A']]);
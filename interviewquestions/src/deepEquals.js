// better implementation, considers many edge cases for arrays vs objects
function deepEquals(valueOne, valueTwo) {
    if(typeof valueOne !== typeof valueTwo) {
      return false;
    }
  
    if(valueOne === valueTwo) {
      return true;
    }
    if(Number.isNaN(valueOne) && Number.isNaN(valueTwo)) {
      return true;
    }
  
    // either one is primitive, must have checked pass above for equality, if they were really equal
    if(typeof valueOne !== "object" || typeof valueTwo !== "object"){
      return false;
    }
    
    // same type, but not same value
    // valueOne and valueTwo are objects
    if(valueOne === null && valueTwo !== null) {
      return false;
    }
    if(valueOne !== null && valueTwo === null) {
      return false;
    }
  
    // this is because {a: []} and {a:{}} would be treated as similar
    if(Array.isArray(valueOne) && !Array.isArray(valueTwo)){
      return false;
    }
    if(!Array.isArray(valueOne) && Array.isArray(valueTwo)) {
      return false;
    }
  
    // console.log('v1 = ',JSON.stringify(valueOne));
    // console.log('v2 = ',JSON.stringify(valueTwo));
  
    // either both or objects or both ar arrays.
    // both are non-empty objects, or arrays, do a recursive compare
    let aKeys = Object.keys(valueOne);
    let bKeys = Object.keys(valueTwo);
    if(aKeys.length !== bKeys.length) {
      return false;
    }
  
    let ret = true;
    for(let i=0;i<aKeys.length;i++) {
      let actualKey = aKeys[i];
      ret = ret && (bKeys.includes(actualKey)) && deepEquals(valueOne[actualKey], valueTwo[actualKey]);
    }
    return ret;
    
}
  
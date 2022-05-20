

let a = { hi: "hello", hey: "hye"};
let b = { do: "doing", op: "ho" };

let arr = [a,b];

/**
 * Removing an element by reference, 
 * this mutates arr in place.
 * @param {*} arr 
 * @param {*} a 
 */
function removeElement(arr, a) {
    var posToRemove = -1;
    for(var i =0; i< arr.length; i++) {
        if(arr[i] == a) {
            posToRemove = i;
            break;
        }
    }
    if(posToRemove >= 0) {// only remove if present
        arr.splice(posToRemove, 1);
    }
}

removeElement(arr, a);
console.log(arr);
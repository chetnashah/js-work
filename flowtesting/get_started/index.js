

// @flow
//

// run flow with npm run-script flow
var str : string = "hello world";
console.log(str);

// Mostly we will annotate our js files with types wherever necessary.
// following three have inline annotation
/* 1. annotating variables with types */

var foo : string = "Hi world";

var baz : number = 0;
var bar : boolean;
bar = true;

/* 2. annotating function declarations with types */
function numVowels(word: string) : number
{
    const vowels = new Set("aeiou");
    let count = 0;
    for (let char of word)
        if (vowels.has(char))
            count++;
    return count;
}

/* 3. Polymorphic functions with type parameters/type variables with <T> */
function reversed<T>(array: T[]): T[] {
    let ret = [];
    let i = array.length;
    while (i--)
        ret.push(array[i]);
    return ret;
}

/* built in types: boolean, number, string, null and void, any, mixed */

/* 4. type annotating arrays */
let arr : number[] = [1, 2, 3.14, 42]; // T[]
let arr2 : Array<string> = ["an alternate", "syntax", "for arrays"];

// following does not type check
// let ar3 : Array<number> = [1,2, "4"]; // collection of same type needed

/* 5. type definitions in isolation */
type Person = {
    name: string,
    age: number
};

type TimesTwo = (value: number) => number;

type Identity = <T>(x: T) => T;

type NumArray = number[];

let a2 : NumArray = [1,2,3,5,6,7,5.12,2.22];
let double : TimesTwo = (x) => (x * 2);
let p1 : Person = { name: 'cc', age: 100 };





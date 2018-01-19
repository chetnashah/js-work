Some notes from:
http://jibbering.com/faq/notes/closures/
and Ecma specification.

Steps for creation of an execution context as a result of a function call:
1. Creation Stage [when the function is called, but before it executes any code inside]:
Create the Scope Chain. [[scope]] = [ parent frames/VOs/Activations]
Create variables, functions and arguments. Its own[Frame/VO/Activation]
Determine the value of "this".

2. Activation / Code Execution Stage:
Assign values, references to functions and interpret / execute code in the scope of [[scope]].

-----------------------------------------------

The scope chain property of each execution context is simply a collection of the current context's envFrame/[VO] + all parent’s lexical envFrame/[VO]s.

VO/Lexical VO is same as a env Frame or a lexicalEnvironment. scope chain held in the function object's [[scope]] property.

Function objects created with function declarations or function expressions have the scope chain of the execution context in which they are created assigned to their internal [[scope]] property. (i.e the parent lexicalEnv, parent envFrame or ), here by parent we mean parent in code, i.e. lexically.

If a parent VO is not held by a given function(function is closed in its parameters), the parent vo's can be garbage collected.


All javascript code is executed in an execution context. Global code (code executed inline, normally as a JS file, or HTML page, loads) gets executed in global execution context, and each invocation of a function (possibly as a constructor) has an associated execution context. 

When a javascript function is called it enters an execution context, if another function is called (or the same function recursively) a new execution context is created and execution enters that context for the duration of the function call. Returning to the original execution context when that called function returns. Thus running javascript code forms a stack of execution contexts.






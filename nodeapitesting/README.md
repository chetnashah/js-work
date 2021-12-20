https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/

### spawn 

Spawn is a command designed to run system commands. 
**When you run spawn, you send it a system command that will be run on its own process, but does not execute any further code within your node process.** You can add listeners for the process you have spawned, to allow your code interact with the spawned process, but no new V8 instance is created(unless of course your command is another Node command, but in this case you should use fork!) and only one copy of your node module is active on the processor.

Spawn
When spawn is called, it creates a streaming interface between the parent and child process. Streaming Interface — one-time buffering of data in a binary format.


### fork
**Fork is a special instance of spawn, that runs a fresh instance of the V8 engine**. Meaning, you can essentially create multiple workers, running on the exact same Node code base, or perhaps a different module for a specific task. This is most useful for creating a worker pool. While node's async event model allows a single core of a machine to be used fairly efficiently, it doesn't allow a node process to make use of multi core machines. Easiest way to accomplish this is to run multiple copies of the same program, on a single processor.

Fork
When fork is called, it creates a communication channel between the parent and child process Communication Channel — messaging


### exec

creates a process which does create a shell. The exec function has one other major difference. It buffers the command’s generated output and passes the whole output value to a callback function (instead of using streams, which is what spawn does).


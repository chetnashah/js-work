var fs = require('fs');

// This implementation stores object directed graph 
// for representing the FSM instead of in a table/matrix
class Action {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    setName(name) {
        this._name = name;
    }
}

class State {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._nextStates = new Map();
    }

    setName(name) {
        this.name = name;
    }

    addNextState(state, action) {
        this._nextStates.set(action._id, state);
    }

    getNextStates() {
        return this._nextStates.entries();
    }

    getNextState(action) {
        return this._nextStates.get(action._id);
    }
}

// class FSM {
//     State startState;
//     Set allStates;
//     Set allActions;
// }

//TODO refactor below code into the FSM class
// file contents are in JSON.
const fileContents = fs.readFileSync("./res/input.txt");
const fileContentsJSON = JSON.parse(fileContents);

const allStates = new Map();
for (state of fileContentsJSON.states) {
    allStates.set(state.name, new State(state.name, state.name));
}

const allActions = new Map();
for (action of fileContentsJSON.events) {
    allActions.set(action.name, new Action(action.name, action.name));
}
console.log(allActions);

for (transition of fileContentsJSON.transitions) {
    const fromState = allStates.get(transition.from);
    const toState = allStates.get(transition.to);
    const triggerAction = allActions.get(transition.trigger);
    fromState.addNextState(toState, triggerAction);
}

const initialState = allStates.get(fileContentsJSON.initialState);
const eventOneAction = allActions.get('EventOne');
console.log(eventOneAction);
console.log(initialState);
console.log(initialState.getNextState(eventOneAction));

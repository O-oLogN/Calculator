import * as math from 'mathjs';

const BUTTON_CLICK = 'BUTTON_CLICK';

let currentNumberLength = 0;
let currentOperator = "";
let currentStr = "";
let haveDotAlready = false;
let isEnd = false;

export const clickButtonReducer = (state = {topScreen: "", bottomScreen: "0"}, action) => {
    switch (action.type) {
        case BUTTON_CLICK:
            return inputHandler(state, action.data);
        default:
            return state;
    }
}

const inputHandler = (state, inputStr) => {
    if (inputStr === "AC") {
        reset();
        return { topScreen: "", bottomScreen: "0" };
    }
    if (currentStr.length >= 29){}
    if (!isNaN(inputStr)) {
        if (isEnd) {
            reset();
            return { topScreen: inputStr === "0" ? "" : inputStr, bottomScreen: inputStr };
        }
        if (inputStr === "0" && !currentStr) return state;
        ++currentNumberLength;
        // if (currentNumberLength >= 10) return state;
        currentStr += inputStr;
        if (currentOperator !== "") {
            currentOperator = "";
            return Object.assign({}, state, { topScreen: currentStr, bottomScreen: inputStr });
        }
        return Object.assign({}, state, { topScreen: currentStr, bottomScreen: (currentStr.length === 1 ? "" : state.bottomScreen) + inputStr });
    }
    else {
        if (!currentStr) return state;
        if (inputStr !== "=" && inputStr !== ".") {
            if (isEnd) {
                isEnd = false;
                currentStr = state.bottomScreen + inputStr;
            }
            else {
                currentStr = (currentOperator ? currentStr.substring(0, currentStr.length - 1) : currentStr) + inputStr; 
            }
            currentNumberLength = 0;
            haveDotAlready = false;
            currentOperator = inputStr;
            return Object.assign({}, state, { topScreen: currentStr, bottomScreen: currentOperator});
        }
        if (inputStr !== "=" && inputStr === ".") {
            if (isEnd) {
                if (state.bottomScreen.includes(".")) {
                    return state;
                }
                isEnd = false;
                currentStr = state.bottomScreen;
                currentNumberLength = currentStr.includes(".") ? currentStr.split(".")[1].length : currentStr.length;
                haveDotAlready = currentStr.includes(".");
            }
            if (haveDotAlready) return state;
            currentStr += inputStr;
            haveDotAlready = true;
            return Object.assign({}, state, { topScreen: currentStr, bottomScreen: state.bottomScreen + "." });
        }
        currentStr += inputStr;
        isEnd = true;
        return calc(currentStr, state);
    }
}

const reset = () => {
    currentNumberLength = 0;
    currentOperator = "";
    currentStr = "";
    haveDotAlready = false;
    isEnd = false;
}

const calc = (str, state) => {
    let res = math.evaluate(str.substring(0, str.length - 1));
    const formattedRes = math.format(res, { precision: 14 });
    return Object.assign({}, state, { topScreen: str + formattedRes, bottomScreen: formattedRes });
}
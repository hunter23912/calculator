import { current } from "@reduxjs/toolkit";
import ACTIONS from "./action";

const evaluate = (state) => {
  let { lastOperand, currentOperand, operator } = state;
  lastOperand = parseFloat(lastOperand);
  currentOperand = parseFloat(currentOperand);
  let res = "";

  switch (operator) {
    case "+":
      res = lastOperand + currentOperand;
      break;
    case "-":
      res = lastOperand - currentOperand;
      break;
    case "×":
      res = lastOperand * currentOperand;
      break;
    case "÷":
      res = lastOperand / currentOperand;
      break;
  }
  return res.toString();
};

const reducer = (
  state = {
    currentOperand: "",
    lastOperand: "",
    operator: "",
    overwrite: false,
  },
  action
) => {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.digit,
          overwrite: false,
        };
      }
      if (state.currentOperand === "0" && action.digit === "0") {
        return state;
      }
      if (state.currentOperand === "0" && action.digit !== ".") {
        return {
          ...state,
          currentOperand: action.digit,
        };
      }
      if (action.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      if (action.digit === "." && state.currentOperand === "") {
        return {
          ...state,
          currentOperand: "0.",
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand + action.digit, // 会自动合并覆盖对象
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: "",
          overwrite: false,
        };
      }
      if (state.currentOperand === "") {
        return state;
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1), // 删除0前面一位，就是删除最后一位
      };

    case ACTIONS.CHOOSE_OPERATOR:
      if (state.currentOperand === "" && state.lastOperand === "") {
        return state;
      }
      if (state.lastOperand === "") {
        return {
          ...state,
          lastOperand: state.currentOperand,
          operator: action.operator,
          currentOperand: "",
        };
      }
      if (state.currentOperand === "") {
        return {
          ...state,
          operator: action.operator,
        };
      }
      return {
        ...state,
        lastOperand: evaluate(state),
        operator: action.operator,
        currentOperand: "",
      };

    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "",
        lastOperand: "",
        operator: "",
      };
    case ACTIONS.EVALUATE:
      if (state.currentOperand === "" || state.lastOperand === "" || state.operator === "") {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        lastOperand: "",
        operator: "",
        overwrite: true,
      };
    default:
      return state;
  }
};

export default reducer;

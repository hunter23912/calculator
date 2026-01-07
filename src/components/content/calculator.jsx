import React, { Component } from "react";
import Base from "./base";
import { connect } from "react-redux";
import DigitButton from "./calculator/digitButton";
import ACTIONS from "../../redux/action";
import OperatorButton from "./calculator/operatorButton";

class Calculator extends Component {
  state = {
    formatter: Intl.NumberFormat("en-us"),
  };

  better_format = (number) => {
    const [integer, decimal] = number.split(".");
    if (decimal === undefined) {
      return this.state.formatter.format(integer);
    }
    return `${this.state.formatter.format(integer)}.${decimal}`;
  };

  render() {
    return (
      <Base>
        <div className="calculator">
          <div className="output">
            <div className="last-output">
              {this.better_format(this.props.lastOperand)} {this.props.operator}
            </div>
            <div className="current-output">{this.better_format(this.props.currentOperand)}</div>
          </div>
          <button onClick={this.props.clear} className="button-ac">
            AC
          </button>
          <button onClick={this.props.delete_digit}>Del</button>
          <OperatorButton operator="÷" />
          <DigitButton digit="7" />
          <DigitButton digit="8" />
          <DigitButton digit="9" />
          <OperatorButton operator="×" />
          <DigitButton digit="4" />
          <DigitButton digit="5" />
          <DigitButton digit="6" />
          <OperatorButton operator="-" />
          <DigitButton digit="1" />
          <DigitButton digit="2" />
          <DigitButton digit="3" />
          <OperatorButton operator="+" />
          <DigitButton digit="0" />
          <DigitButton digit="." />
          <button onClick={this.props.evaluate} className="button-equal">
            =
          </button>
        </div>
      </Base>
    );
  }
}

// 录入redux中的state数据到props中
const mapStateToProps = (state, props) => {
  return {
    currentOperand: state.currentOperand,
    lastOperand: state.lastOperand,
    operator: state.operator,
  };
};

// 录入dispatch方法到props中
const mapDispatchToProps = {
  delete_digit: () => {
    return {
      type: ACTIONS.DELETE_DIGIT,
    };
  },
  clear: () => {
    return {
      type: ACTIONS.CLEAR,
    };
  },
  evaluate: () => {
    return {
      type: ACTIONS.EVALUATE,
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);

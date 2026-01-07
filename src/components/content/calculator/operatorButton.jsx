import React, { Component } from "react";
import { connect } from "react-redux";
import ACTIONS from "../../../redux/action";

class OperatorButton extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={() => {
          this.props.choose_operator(this.props.operator);
        }}
      >
        {this.props.operator}
      </button>
    );
  }
}

const mapDispatchToProps = {
  choose_operator: (operator) => {
    return {
      type: ACTIONS.CHOOSE_OPERATOR,
      operator: operator,
    };
  },
};

export default connect(null, mapDispatchToProps)(OperatorButton);

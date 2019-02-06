import React, { Component } from 'react';

class SelectSize extends Component {
  render() {
    const sizes = ["XS", "S", "M", "X", "ML", "L", "XL", "XXL"];
    const SizeButtons = sizes.map((size) => {
      return (
        <SizeButton
          key={size}
          size={size}
          handleToggleFilterSize={() => this.props.handleToggleFilterSize(size)}>
        </SizeButton>
      );
    });
    return (
      <div className="filters">
        <h5 className="title">Sizes:</h5>
        {SizeButtons}
      </div>
    );
  }
}

class SizeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
    }
  }

  toggleCheckboxChange = () => {
    this.setState(({ toggled }) => ({
      toggled: !toggled
    }));
    this.props.handleToggleFilterSize();
  };

  render() {
    return (
      <div className="filters-available-size">
      <label>
        <input
          type="checkbox"
          value={this.props.size}
          checked={this.state.toggled}
          onChange={this.toggleCheckboxChange}>
        </input>
        <span className="checkmark">
          {this.props.size}
        </span>
      </label>
      </div>
    );
  }
}

export default SelectSize;

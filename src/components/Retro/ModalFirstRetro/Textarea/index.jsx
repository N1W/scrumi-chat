import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

export default class Textarea extends Component {

  static propTypes = {
    header: PropTypes.string.isRequired,
    area: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [{
        id: 0,
      }],
      counter: 1,
    };

    this.childNodes = new Map();
    this.onAddTextarea = this.onAddTextarea.bind(this);
  }

  onAddTextarea() {
    this.setState({
      items: [...this.state.items, {
        id: this.state.counter,
      }],
      counter: this.state.counter + 1,
    });
  }

  handleChange(e) {
    const target = e.target;

    this.setState({
      items: this.state.items.map((item) => {
        if (item.id !== Number(target.dataset.id)) {
          return item;
        }
        return {
          ...item,
          text: target.value,
          area: this.props.area,
          hidden: false,
        };
      }),
    });
  }

  render() {
    return (
      <div className="modalRetro__text-input">
        <h3 className="modalRetro__input-header">{this.props.header}</h3>
        {this.state.items.length > 0 &&
          this.state.items.map((item, idx) => (
            <TextareaAutosize
              className="modalRetro__input"
              key={`item-${item.id}`}
              data-id={idx}
              minRows={2}
              onChange={e => this.handleChange(e)}
              value={this.state.items[idx].text}
            />
          ))}
        <div className="modalRetro__add circle-button-s">
          <button type="button" onClick={this.onAddTextarea}>
            <span className="cross-s" /></button>
        </div>
      </div>
    );
  }
}


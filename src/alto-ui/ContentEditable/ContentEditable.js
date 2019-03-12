import React from 'react';
import PropTypes from 'prop-types';

class ContentEditable extends React.Component {
  constructor(props) {
    super(props);

    this.value = props.value;
    this.ref = props.innerRef || React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    if (this.props.value !== this.value) {
      this.value = this.props.value;
      this.update();
    }
  }

  update() {
    this.ref.current.innerHTML = this.value;
  }

  handleChange(e) {
    const { onChange, onInput } = this.props;
    const value = e.target.innerText;
    this.value = value;
    if (typeof onChange === 'function') onChange(e, value);
    if (typeof onInput === 'function') onInput(e);
  }

  handleBlur(e) {
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') onBlur(e);
    if (e.target.innerHTML !== this.value) this.update();
  }

  render() {
    const { tag, value, disabled, onChange, onInput, innerRef, ...otherProps } = this.props;

    const Tag = tag;

    return (
      <Tag
        {...otherProps}
        ref={this.ref}
        onInput={this.handleChange}
        contentEditable={!disabled}
        onBlur={this.handleBlur}
      />
    );
  }
}

ContentEditable.displayName = 'ContentEditable';

ContentEditable.defaultProps = {
  tag: 'div',
  value: '',
};

ContentEditable.propTypes = {
  tag: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  innerRef: PropTypes.object,
};

export default React.forwardRef((props, ref) => <ContentEditable {...props} innerRef={ref} />);

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../../../Form/TextField';
import SaveIcon from '../../../Icons/Save';
import UndoIcon from '../../../Icons/Undo';
import Spinner from '../../../Spinner';
import { createSubscription } from '../../../helpers/pubsub';

import './DropdownItemEditInput.scss';

class DropdownItemEditInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      prevValue: props.value,
      value: props.value,
      error: null,
      pending: false,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.unsubscribePending = () => {};
  }

  componentWillUnmount() {
    this.unsubscribePending();
  }

  static getDerivedSateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      return {
        prevValue: props.value,
        value: props.value,
        pending: false,
        error: null,
      };
    }
    return null;
  }

  handleEdit(e) {
    const { value } = e.target;
    const { item, invalidate } = this.props;
    this.setState({
      value,
      error: value === this.state.prevValue ? null : invalidate(value, item),
    });
  }
  handleReset() {
    this.setState(({ prevValue }) => ({ value: prevValue, error: null }));
  }

  handleSave() {
    const { item, onSave } = this.props;
    const { value } = this.state;
    if (typeof onSave === 'function') {
      const res = onSave(value, item);
      if (res instanceof Promise) {
        this.subscribeToPending(res);
      }
    }
  }

  subscribeToPending(pendingPromise) {
    this.unsubscribePending();
    this.setState({ pending: true });
    const subscribe = createSubscription(pendingPromise);
    this.unsubscribePending = subscribe((data, error) => {
      const { value } = this.state;
      this.setState({ pending: false, error });
      if (!error) this.setState({ prevValue: value });
      this.unsubscribePending();
    });
  }

  render() {
    const { id, label } = this.props;
    const { prevValue, value, error, pending } = this.state;
    const didValueChanged = value !== prevValue;
    return (
      <div className="DropdownItemEditInput">
        <TextField
          id={id}
          className="DropdownItemEditInput__textfield"
          label={label}
          hideLabel
          value={value}
          onChange={this.handleEdit}
          error={!!error}
          helpText={error}
          disabled={pending}
        />
        {pending && <Spinner className="DropdownItemEditInput__spinner" small />}
        {didValueChanged &&
          !pending && (
            <SaveIcon
              className="DropdownItemEditInput__icon"
              onClick={this.handleSave}
              disabled={!!error}
            />
          )}
        {didValueChanged &&
          !pending && (
            <UndoIcon className="DropdownItemEditInput__icon" onClick={this.handleReset} />
          )}
      </div>
    );
  }
}

DropdownItemEditInput.displayName = 'DropdownItemEditInput';

DropdownItemEditInput.defaultProps = {
  invalidate: () => false,
};

DropdownItemEditInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  invalidate: PropTypes.func,
};

export default DropdownItemEditInput;

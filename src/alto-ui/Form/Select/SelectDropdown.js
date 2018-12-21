import React from 'react';
import PropTypes from 'prop-types';

import ChevronDown from '../../Icons/ChevronDown';
import CloseIcon from '../../Icons/Close';
import Dropdown from '../../Dropdown';
import { bemClass } from '../../helpers/bem';

function getItemsFromOptions(options) {
  return (options || []).map(option => {
    const optionKeys = Object.keys(option || '');
    if (option && Array.isArray(option.value))
      return {
        key: option.title,
        ...option,
        section: true,
        items: getItemsFromOptions(option.value),
      };
    const value = option && optionKeys.includes('value') ? option.value : option;

    return {
      key: optionKeys.includes('key') ? option.key : `${value}`,
      title: optionKeys.includes('title') ? option.title : `${value}`,
      value,
      option,
    };
  });
}

function getDropdownStyle(style, trigger) {
  return { minWidth: trigger.offsetWidth };
}

function flattenItems(items) {
  return items.reduce(
    (acc, item) => [...acc, ...(Array.isArray(item.items) ? flattenItems(item.items) : [item])],
    []
  );
}

class SelectDropdown extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.renderTrigger = this.renderTrigger.bind(this);
    this.handleClear = this.handleClear.bind(this);

    this.triggerRef = React.createRef();
  }

  getProps() {
    const {
      id,
      selectRef,
      options,
      value,
      onChange,
      className,
      placeholder,
      success,
      error,
      large,
      small,
      readonly,
      defaultValue,
      multiple,
      disabled,
      clearable,
      ...props
    } = this.props;
    const items = getItemsFromOptions(options);
    const flattenedItems = flattenItems(items);
    return {
      triggerRef: selectRef || this.triggerRef,
      selected: flattenedItems
        .filter(item => (Array.isArray(value) ? value.includes(item.value) : value === item.value))
        .map(({ key }) => key),
      defaultLabel: placeholder,
      start: !props.end && !props.middle,
      ...props,
      items,
      onClick: this.handleClick,
      style: getDropdownStyle,
    };
  }

  handleClear() {
    const { onChange } = this.props;
    if (this.props.multiple) {
      onChange([], '', {});
    } else {
      onChange('', {}, []);
    }
  }

  handleClick(item) {
    const { onChange } = this.props;
    const { selected, items } = this.getProps();
    const flattenedItems = flattenItems(items);
    const selection = (selected.includes(item.key)
      ? selected.filter(x => x !== item.key)
      : [...selected, item.key]
    ).map(key => flattenedItems.find(x => x.key === key).value);
    if (this.props.multiple) {
      onChange(selection, item.value, item.option);
    } else {
      onChange(item.value, item.option, selection);
    }
  }

  renderTrigger(onClick, open) {
    const { defaultLabel, selected, items } = this.getProps();

    const { success, error, large, small, readonly, selectRef, disabled } = this.props;
    const flattenedItems = flattenItems(items);
    const selectedTitles = selected
      .map(key => flattenedItems.find(x => x.key === key))
      .filter(x => x !== undefined)
      .map(({ title }) => title)
      .join(', ');

    const clearable = this.props.clearable && !!selectedTitles;

    return (
      <div className={bemClass('Select--dropdown__wrapper', { clearable })}>
        <button
          id={this.props.id}
          ref={selectRef || this.triggerRef}
          className={bemClass('Select', {
            dropdown: true,
            open,
            success,
            error,
            large,
            small,
            readonly,
            disabled,
          })}
          aria-labelledby={`${this.props.id}__label`}
          onClick={onClick}
          disabled={disabled}
        >
          <div className={bemClass('Select--dropdown__label', { clearable })}>
            {selectedTitles || defaultLabel}
          </div>

          <div className="Select--dropdown__icon Select--dropdown__icon--chevron">
            <ChevronDown />
          </div>
        </button>
        {clearable && (
          <button
            disabled={disabled}
            onClick={this.handleClear}
            className="Select--dropdown__icon Select--dropdown__icon--clear"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }

  render() {
    return (
      <Dropdown
        {...this.getProps()}
        id={`${this.props.id}__dropdown`}
        renderTrigger={this.renderTrigger}
        closeFocusTargetId={this.props.id}
      />
    );
  }
}

SelectDropdown.displayName = 'SelectDropdown';

SelectDropdown.defaultProps = {
  placeholder: '',
};

SelectDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  helpText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.array,
        ]),
      }),
    ])
  ),
  label: PropTypes.string,
  selectRef: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  defaultValue: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
};

export default SelectDropdown;

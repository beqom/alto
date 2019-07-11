import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import TextField from '../TextField';
import Popover from '../../Popover';
import List from '../../List';
import CaretDown from '../../Icons/CaretDown';
import useUniqueKey from '../../hooks/useUniqueKey';

import './Typeahead.scss';
import getItemKey from '../../helpers/getItemKey';

const LABELS = {
  noResults: 'No Result',
};

const renderFields = (inputValue, itemToString, fields) => (item, ...args) => {
  if (typeof fields !== 'function') return fields;
  const itemStringified = itemToString(item);
  if (!inputValue) return fields(item, itemStringified, ...args);
  const indexOfValue = itemStringified.toLowerCase().indexOf(inputValue.toLowerCase());

  const itemToStringFromated = (
    <>
      <span className="Typeahead__not-matched">{itemStringified.slice(0, indexOfValue)}</span>
      <span className="Typeahead__matched">
        {itemStringified.slice(indexOfValue, indexOfValue + inputValue.length)}
      </span>
      <span className="Typeahead__not-matched">
        {itemStringified.slice(indexOfValue + inputValue.length)}
      </span>
    </>
  );
  return fields(item, itemToStringFromated, ...args);
};

function typeaheadStateReducer(state, changes) {
  switch (changes.type) {
    // ON BLUR (on click outside)
    case Downshift.stateChangeTypes.mouseUp:
      return {
        ...changes,
        // if onBlur and inputValue is empty, keep it empty, dont revert to prev value
        inputValue: !state.inputValue ? state.inputValue : changes.inputValue,
      };
    case Downshift.stateChangeTypes.changeInput:
      return {
        ...changes,
        isOpen: !!changes.inputValue,
      };
    default:
      return changes;
  }
}

function Typeahead({
  items,
  itemToString: itemToStringFromProps,
  itemToValue: itemToValueFromProps,
  fields,
  value,
  onChange,
  labels: labelsProps,
  ...props
}) {
  const inputRef = useRef();
  const id = useUniqueKey(props.id);
  const labels = {
    ...LABELS,
    ...labelsProps,
  };

  const itemToString = item => (item ? itemToStringFromProps(item) : '');
  const itemToValue = item =>
    item ? getItemKey(itemToValueFromProps)(item) || itemToString(item) : '';
  const itemFromValue = val => items.find(item => itemToValue(item) === val);
  const selectedItem = useMemo(() => itemFromValue(value) || '', [value]);

  return (
    <Downshift
      selectedItem={selectedItem}
      itemToString={item => (item ? itemToString(item) : '')}
      defaultHighlightedIndex={0}
      stateReducer={typeaheadStateReducer}
      onInputValueChange={val => {
        if (!val && !!value) onChange(undefined);
      }}
      onSelect={item => {
        const newValue = itemToValue(item);
        if (newValue !== value) {
          onChange(newValue);
        }
      }}
    >
      {({ getInputProps, isOpen, inputValue, getItemProps, highlightedIndex, openMenu }) => {
        const itemsFiltered = items.filter(
          item =>
            !inputValue ||
            itemToString(item)
              .toLowerCase()
              .includes(inputValue.toLowerCase())
        );

        return (
          <div>
            <TextField
              {...getInputProps({
                clearable: true,
                ...props,
                ref: inputRef,
                onFocus(e) {
                  if (typeof props.onFocus === 'function') props.onFocus(e);
                  openMenu();
                },
              })}
            >
              {input => (
                <>
                  {input}
                  {!inputValue && <CaretDown onClick={openMenu} />}
                </>
              )}
            </TextField>
            <Popover
              id={`${id}__popover`}
              className="Typeahead__menu"
              open={isOpen}
              target={inputRef.current ? inputRef.current.parentElement : undefined}
              bottom
              start
              style={{
                width: inputRef.current ? inputRef.current.parentElement.offsetWidth : undefined,
              }}
            >
              {itemsFiltered.length ? (
                <List
                  id={`${id}__list`}
                  items={itemsFiltered}
                  borderless
                  fields={renderFields(inputValue, itemToString, fields)}
                  hover={(item, index) => highlightedIndex === index}
                  // active={item => highlightedIndex === index}
                  renderItem={(render, item, _, index) => (
                    <div {...getItemProps({ key: item.id, index, item })}>{render()}</div>
                  )}
                />
              ) : (
                <div className="Typeahead__custom-item Typeahead__custum-item--no-result">
                  {labels.noResults}
                </div>
              )}
            </Popover>
          </div>
        );
      }}
    </Downshift>
  );
}

function defaultItemToString(item) {
  if (typeof item === 'string' || typeof item === 'number') return item;
  return item.title || item.name || item.value;
}

Typeahead.defaultProps = {
  itemToString: defaultItemToString,
  onChange: () => {},
  fields: (item, itemToStringFromated) => [
    {
      key: 'default',
      primary: true,
      render() {
        return itemToStringFromated;
      },
    },
  ],
};

Typeahead.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  onChange: PropTypes.func,
  id: PropTypes.string,
  itemToString: PropTypes.func,
  itemToValue: PropTypes.func,
  labels: PropTypes.shape({
    noResults: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  fields: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  onFocus: PropTypes.func,
};
export default Typeahead;

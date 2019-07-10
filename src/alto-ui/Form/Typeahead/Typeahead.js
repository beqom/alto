import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import TextField from '../TextField';
import Popover from '../../Popover';
import List from '../../List';
import CaretDown from '../../Icons/CaretDown';
import useUniqueKey from '../../hooks/useUniqueKey';

import './Typeahead.scss';

const LABELS = {
  noResults: 'No Result',
};

function defaultItemToString(item) {
  if (typeof item === 'string' || typeof item === 'number') return item;
  return item.title || item.name || item.value;
}

const renderFields = (inputValue, itemToString, fields) => (item, ...args) => {
  if (typeof fields !== 'function') return fields;
  const intemStringified = itemToString(item);
  if (!inputValue) return fields(item, intemStringified, ...args);
  const indexOfValue = intemStringified.toLowerCase().indexOf(inputValue.toLowerCase());

  const itemToStringFromated = (
    <>
      <span className="Typeahead__not-matched">{intemStringified.slice(0, indexOfValue)}</span>
      <span className="Typeahead__matched">
        {intemStringified.slice(indexOfValue, indexOfValue + inputValue.length)}
      </span>
      <span className="Typeahead__not-matched">
        {intemStringified.slice(indexOfValue + inputValue.length)}
      </span>
    </>
  );
  return fields(item, itemToStringFromated, ...args);
};

function Typeahead({
  items,
  itemToString,
  fields,
  value,
  onChange,
  labels: labelsGiven,
  ...props
}) {
  const inputRef = useRef();
  const id = useUniqueKey(props.id);
  const labels = {
    ...LABELS,
    ...labelsGiven,
  };

  return (
    <Downshift
      itemValue={value}
      itemToString={item => (item ? itemToString(item) : '')}
      defaultHighlightedIndex={0}
      stateReducer={(state, changes) => {
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
        const inputProps = getInputProps();
        return (
          <div>
            <TextField
              clearable
              {...props}
              {...inputProps}
              ref={inputRef}
              onFocus={e => {
                if (typeof props.onFocus === 'function') props.onFocus(e);
                openMenu();
              }}
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

Typeahead.defaultProps = {
  itemToString: defaultItemToString,
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
  itemToString: PropTypes.string,
  labels: PropTypes.shape({
    noResults: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  fields: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onFocus: PropTypes.func,
};
export default Typeahead;

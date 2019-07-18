import React, { useRef, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import TextField from '../TextField';
import Popover from '../../Popover';
import List from '../../List';
import CaretDown from '../../Icons/CaretDown';
import useUniqueKey from '../../hooks/useUniqueKey';
import getItemKey from '../../helpers/getItemKey';
import Spinner from '../../Spinner';
import FormElement from '../FormElement';
import './Typeahead.scss';
import Button from '../../Button';

const LABELS = {
  noResults: 'No Result',
  loading: 'Loading...',
  loadMore: 'Load more',
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
    default:
      return changes;
  }
}

function usePrevious(value) {
  const ref = useRef(value);
  const prevValue = ref.current;
  ref.current = value;
  return prevValue;
}

const Typeahead = React.forwardRef(
  (
    {
      items: itemsFromProps,
      itemToString: itemToStringFromProps,
      itemToValue: itemToValueFromProps,
      fields,
      value,
      onChange,
      labels: labelsProps,
      loading,
      onOpen,
      pageSize,
      totalItems,
      onChangePage,
      itemKey,
      ...props
    },
    passedRef
  ) => {
    const defaultInputRef = useRef();
    const inputRef = passedRef || defaultInputRef;
    const id = useUniqueKey(props.id);
    const labels = {
      ...LABELS,
      ...labelsProps,
    };
    const items = Array.isArray(itemsFromProps) ? itemsFromProps : [];
    const getKey = getItemKey(itemKey);

    const itemToString = item => (item ? itemToStringFromProps(item) : '');
    const itemToValue = item =>
      item ? getItemKey(itemToValueFromProps)(item) || itemToString(item) : '';
    const itemFromValue = val => items.find(item => itemToValue(item) === val);
    const selectedItem = useMemo(() => itemFromValue(value) || '', [value]);

    const [isFocused, setFocus] = useState(false);
    const [isMenuOpen, setOpenMenu] = useState(false);
    const [tempValue, setTempValue] = useState(() => itemToString(selectedItem));

    const valueToString = isFocused || isMenuOpen ? tempValue : itemToString(selectedItem);

    const prevTempValue = usePrevious(tempValue);

    const hasPagination = typeof onChangePage === 'function';
    const hasNotTotalYet = typeof totalItems !== 'number';
    const nextValueIsDiff = !(tempValue || '').includes(prevTempValue);
    const isPaginated =
      hasPagination && (hasNotTotalYet || items.length < totalItems || nextValueIsDiff);

    const itemsFiltered = useMemo(
      () =>
        isPaginated
          ? items
          : items.filter(
              item =>
                !tempValue ||
                itemToString(item)
                  .toLowerCase()
                  .includes(tempValue.toLowerCase())
            ),
      [items, tempValue]
    );

    function changePage(page, search = tempValue) {
      if (typeof onChangePage === 'function') onChangePage(page, search || '');
    }

    const handleLoadMore = openMenu => e => {
      e.stopPropagation();
      openMenu();
      if (isPaginated && typeof pageSize === 'number') {
        const currentPage = Math.ceil(items.length / pageSize);
        changePage(currentPage + 1);
      }
    };

    function triggerChangeFirstPage() {
      if (isPaginated) changePage(1);
    }

    useEffect(triggerChangeFirstPage, [tempValue]);

    return (
      <Downshift
        inputValue={valueToString}
        itemToString={item => (item ? itemToString(item) : '')}
        defaultHighlightedIndex={0}
        stateReducer={typeaheadStateReducer}
        onInputValueChange={val => {
          if (!val && !!value) onChange(undefined);
        }}
        onStateChange={changes => {
          if (changes.isOpen) {
            setOpenMenu(true);
            if (typeof onOpen === 'function') onOpen(triggerChangeFirstPage);
          } else if (changes.isOpen === false) {
            setOpenMenu(false);
          }
        }}
        onSelect={item => {
          const newValue = itemToValue(item);
          setTempValue(itemToString(item));
          if (newValue !== value) {
            onChange(newValue);
          }
        }}
      >
        {({
          getRootProps,
          getInputProps,
          isOpen,
          inputValue,
          getItemProps,
          highlightedIndex,
          openMenu,
        }) => (
          <FormElement {...getRootProps({ ...props, id })}>
            <TextField
              {...getInputProps({
                clearable: true,
                ...props,
                ref: inputRef,
                onFocus(e) {
                  if (typeof props.onFocus === 'function') props.onFocus(e);
                  setFocus(true);
                  openMenu();
                },
                onInput(e) {
                  setTempValue(e.target.value);
                },
                onBlur(e) {
                  if (typeof props.onBlur === 'function') props.onBlur(e);
                  setFocus(false);
                },
              })}
              label=""
              className="Typeahead__input"
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
                minWidth: inputRef.current ? inputRef.current.parentElement.offsetWidth : undefined,
              }}
            >
              {(itemsFiltered.length && (
                <>
                  <List
                    id={`${id}__list`}
                    items={itemsFiltered}
                    borderless
                    fields={renderFields(inputValue, itemToString, fields)}
                    hover={(item, index) => highlightedIndex === index}
                    // active={item => itemToValue(item) === value}
                    renderItem={(render, item, _, index) => (
                      <div {...getItemProps({ key: getKey(item), index, item })}>{render()}</div>
                    )}
                  />
                  {!loading && isPaginated && (
                    <Button
                      className="Typeahead__load-more"
                      flat
                      onMouseUp={handleLoadMore(openMenu)}
                    >
                      {labels.loadMore}
                    </Button>
                  )}
                </>
              )) ||
                (!loading && (
                  <div className="Typeahead__custom-item Typeahead__custum-item--no-result">
                    {labels.noResults}
                  </div>
                ))}
              {!!loading && (
                <div className="Typeahead__custom-item Typeahead__custum-item--loading">
                  <Spinner className="Typeahead__loading-spinner" small />
                  {labels.loading}
                </div>
              )}
            </Popover>
          </FormElement>
        )}
      </Downshift>
    );
  }
);

function defaultItemToString(item) {
  if (typeof item === 'string' || typeof item === 'number') return item;
  return item.title || item.name || item.value;
}

Typeahead.displayName = 'Typeahead';

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
  itemKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  labels: PropTypes.shape({
    noResults: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  fields: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  loading: PropTypes.bool,
  onOpen: PropTypes.func,

  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  onChangePage: PropTypes.func,
};
export default Typeahead;

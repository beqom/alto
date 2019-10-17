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
import Button from '../../Button';
import RemoveIcon from '../../Icons/Times';
import './Typeahead.scss';
import { bemClass } from '../../helpers/bem';

const LABELS = {
  noResults: 'No Result',
  loading: 'Loading...',
  loadMore: 'Load more',
};

const renderFields = (search, itemToString, fields) => (item, ...args) => {
  if (typeof fields !== 'function') return fields;
  const itemStringified = itemToString(item);
  if (!search) return fields(item, itemStringified, ...args);
  const indexOfValue = itemStringified.toLowerCase().indexOf(search.toLowerCase());

  const itemToStringFromated = (
    <>
      <span className="Typeahead__not-matched">{itemStringified.slice(0, indexOfValue)}</span>
      <span className="Typeahead__matched">
        {itemStringified.slice(indexOfValue, indexOfValue + search.length)}
      </span>
      <span className="Typeahead__not-matched">
        {itemStringified.slice(indexOfValue + search.length)}
      </span>
    </>
  );
  return fields(item, itemToStringFromated, ...args);
};

function typeaheadStateReducer(state, changes, documentRef, dropdownRef) {
  switch (changes.type) {
    // ON BLUR (on click outside)
    case Downshift.stateChangeTypes.mouseUp: {
      // We have to check if user clicks on scrollbar, because on IE it triggers onBlur event
      // If yes, we don't want to hide dropdown list
      const {
        current: { activeElement },
      } = documentRef;
      const { current: dropdownListRef } = dropdownRef;
      const wasScrollBarClicked = activeElement.isSameNode(dropdownListRef);
      return {
        ...changes,
        // if onBlur and inputValue is empty, keep it empty, dont revert to prev value
        inputValue: state.inputValue,
        highlightedIndex: wasScrollBarClicked ? state.highlightedIndex : changes.highlightedIndex,
        isOpen: wasScrollBarClicked,
      };
    }
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
      onClose,
      onOpen,
      pageSize,
      totalItems,
      onChangePage,
      itemKey,
      clearable,
      edited,
      ...props
    },
    passedRef
  ) => {
    const defaultInputRef = useRef();
    const dropdownRef = useRef();
    const documentRef = useRef(document);
    const inputRef = passedRef || defaultInputRef;
    const id = useUniqueKey(props.id);
    const labels = {
      ...LABELS,
      ...labelsProps,
    };
    const items = Array.isArray(itemsFromProps) ? itemsFromProps : [];
    const getKey = getItemKey(itemKey);

    const [isFocused, setFocus] = useState(false);
    const [isMenuOpen, setOpenMenu] = useState(false);
    const [search, setSearch] = useState(null);
    const prevsearch = usePrevious(search);
    const instance = useRef({}).current;

    const itemToString = item => (item ? itemToStringFromProps(item) : '');
    const itemToValue = item =>
      item ? getItemKey(itemToValueFromProps)(item) || itemToString(item) : '';
    const itemFromValue = val => items.find(item => itemToValue(item) === val);
    const selectedItem = useMemo(
      () =>
        value === instance.value && instance.selectedItem
          ? instance.selectedItem
          : itemFromValue(value) || '',
      [value, items]
    );
    instance.value = value;
    instance.selectedItem = selectedItem;

    const selectedString = itemToString(selectedItem);

    const valueToString =
      (isFocused || isMenuOpen) && search !== null ? search : selectedString || value;

    const hasPagination = typeof onChangePage === 'function';
    const hasNotTotalYet = typeof totalItems !== 'number';
    const nextValueIsDiff = !(search || '').includes(prevsearch);
    const isPaginated =
      hasPagination && (hasNotTotalYet || items.length < totalItems || nextValueIsDiff);

    const itemsFiltered = useMemo(
      () =>
        isPaginated
          ? items
          : items.filter(
              item =>
                !search ||
                itemToString(item)
                  .toLowerCase()
                  .includes(search.toLowerCase())
            ),
      [items, search]
    );

    function changePage(page, s = valueToString) {
      if (typeof onChangePage === 'function') onChangePage(page, s || '');
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

    useEffect(() => {
      if (isFocused || isMenuOpen) triggerChangeFirstPage();
    }, [search]);

    useEffect(() => setSearch(null), [isMenuOpen, value]);

    useEffect(() => {
      if (typeof onClose === 'function' && !isMenuOpen) onClose();
    }, [isMenuOpen]);

    return (
      <Downshift
        inputValue={valueToString}
        itemToString={item => (item ? itemToString(item) : '')}
        defaultHighlightedIndex={0}
        stateReducer={(state, changes) =>
          typeaheadStateReducer(state, changes, documentRef, dropdownRef)
        }
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
          setSearch(null);
          if (newValue !== value) {
            onChange(newValue, item);
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
          selectItem,
          toggleMenu,
          closeMenu,
        }) => (
          <FormElement {...getRootProps({ ...props, id })}>
            <TextField
              {...getInputProps({
                ...props,
                ref: inputRef,
                onFocus(e) {
                  if (typeof props.onFocus === 'function') props.onFocus(e);
                  setFocus(true);
                  openMenu();
                },
                onChange(e) {
                  if (e.target.value === selectedString) setSearch(null);
                  else setSearch(e.target.value);
                },
                onBlur(e) {
                  if (typeof props.onBlur === 'function') props.onBlur(e);
                  setFocus(false);
                },
              })}
              label=""
              className={bemClass('Typeahead__input', { edited })}
            >
              {input => (
                <>
                  {input}
                  {isOpen && !!inputValue && clearable && (
                    <RemoveIcon
                      className="Typeahead__clear"
                      onClick={() => {
                        onChange(undefined, {});
                        closeMenu();
                      }}
                    />
                  )}
                  <CaretDown
                    id={`${id}__caret-down`}
                    onClick={toggleMenu}
                    className={bemClass('Typeahead__caret', { close: isOpen })}
                  />
                </>
              )}
            </TextField>
            <Popover
              id={`${id}__popover`}
              className="Typeahead__menu"
              open={isOpen}
              forwardedRef={dropdownRef}
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
                    fields={renderFields(search, itemToString, fields)}
                    hover={(item, index) => highlightedIndex === index}
                    active={item => itemToValue(item) === value}
                    renderItem={(render, item, _, index) => (
                      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                      <div
                        {...getItemProps({ key: getKey(item), index, item })}
                        onMouseDown={() => selectItem(item)}
                        className="Typeahead__item"
                      >
                        {render()}
                      </div>
                    )}
                  />
                  {!loading && isPaginated && items.length < totalItems && (
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  onClose: PropTypes.func,
  onBlur: PropTypes.func,
  loading: PropTypes.bool,
  onOpen: PropTypes.func,
  clearable: PropTypes.bool,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  onChangePage: PropTypes.func,
};
export default Typeahead;

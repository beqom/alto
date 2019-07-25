import React, { Fragment, useRef, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import TextField from '../TextField';
import Popover from '../../Popover';
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

const renderTitle = (search, item, itemToString) => {
  const itemStringified = itemToString(item);
  if (!search) return itemStringified;
  const indexOfValue = itemStringified.toLowerCase().indexOf(search.toLowerCase());

  return (
    <Fragment>
      <span className="Typeahead__not-matched">{itemStringified.slice(0, indexOfValue)}</span>
      <span className="Typeahead__matched">
        {itemStringified.slice(indexOfValue, indexOfValue + search.length)}
      </span>
      <span className="Typeahead__not-matched">
        {itemStringified.slice(indexOfValue + search.length)}
      </span>
    </Fragment>
  );
};

function typeaheadStateReducer(state, changes) {
  switch (changes.type) {
    // ON BLUR (on click outside)
    case Downshift.stateChangeTypes.mouseUp:
      return {
        ...changes,
        // if onBlur and inputValue is empty, keep it empty, dont revert to prev value
        inputValue: state.inputValue,
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
      defaultValue,
      onChange,
      labels: labelsProps,
      loading,
      onOpen,
      pageSize,
      totalItems,
      onChangePage,
      itemKey,
      clearable,
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

    const [isFocused, setFocus] = useState(false);
    const [isMenuOpen, setOpenMenu] = useState(false);
    const [search, setSearch] = useState(null);
    const prevsearch = usePrevious(search);
    const instance = useRef({}).current;

    const itemToString = item => (item ? itemToStringFromProps(item) : '');
    const itemToValue = item =>
      item ? getItemKey(itemToValueFromProps)(item) || itemToString(item) : '';
    const itemFromValue = val => items.find(item => itemToValue(item) === val);
    const getValue = () => {
      if (itemFromValue(value)) return itemFromValue(value);
      if (value && defaultValue) return defaultValue;
      return '';
    };
    const selectedItem = useMemo(
      () =>
        value === instance.value && instance.selectedItem ? instance.selectedItem : getValue(),
      [value, items]
    );
    instance.value = value;
    instance.selectedItem = selectedItem;

    const selectedString = itemToString(selectedItem);

    const valueToString = (isFocused || isMenuOpen) && search !== null ? search : selectedString;

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

    function changePage(page, s = search) {
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

    return (
      <Downshift
        inputValue={valueToString}
        itemToString={item => (item ? itemToString(item) : '')}
        defaultHighlightedIndex={0}
        stateReducer={typeaheadStateReducer}
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
          <FormElement {...getRootProps({ ...props, id })} label="">
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
              className="Typeahead__input"
            >
              {input => (
                <Fragment>
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
                    onClick={toggleMenu}
                    className={bemClass('Typeahead__caret', { close: isOpen })}
                  />
                </Fragment>
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
                <Fragment>
                  <ul>
                    {itemsFiltered.map((item, index) => (
                      <li
                        {...getItemProps({ key: getKey(item), index, item })}
                        className={bemClass('Typeahead__item', {
                          hover: highlightedIndex === index,
                        })}
                      >
                        <button
                          className="Typeahead__item-button"
                          onMouseDown={() => selectItem(item)}
                        >
                          {renderTitle(search, item, itemToString)}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {!loading && isPaginated && (
                    <Button
                      className="Typeahead__load-more"
                      flat
                      onMouseUp={handleLoadMore(openMenu)}
                    >
                      {labels.loadMore}
                    </Button>
                  )}
                </Fragment>
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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  clearable: PropTypes.bool,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  onChangePage: PropTypes.func,
};
export default Typeahead;

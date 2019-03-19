import React, { Fragment, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../helpers/bem';

import useEventListener from '../../hooks/useEventListener';
import useFocusInOut from '../../hooks/useFocusInOut';
import Tag from '../../Tag';

import './TagInput.scss';

const sliceArr = (xs, i, j) =>
  xs.reduce((acc, x, k) => {
    if (k >= i && k <= j && i < j) return [...acc, x];
    if (k <= i && k >= j && i > j) return [x, ...acc];
    return acc;
  }, []);

function useSelectionKeyboardNav(state, onRemoveTag) {
  const [, setValue] = state.value;
  const [selection, , resetSelection] = state.selection;
  const [, setPosition] = state.position;

  // create a mutable ref
  const instance = useRef({}).current;
  // store state in instance in order to use it in listener
  instance.state = state;

  useEventListener(useRef(document), 'keyup', e => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onRemoveTag(instance.state.selection[0]);

      resetSelection();
      setPosition(null);
    }
    if (e.key === 'Escape') {
      e.stopImmediatePropagation();
      resetSelection();
      setPosition(null);
    }

    const isAlphaNum = /^[a-zA-Z0-9-_ ]$/.test(e.key);
    if (isAlphaNum) {
      setValue(e.key);
      resetSelection();
      setPosition(null);
    }
  })(!!selection.length);
}

function useResettableState(initialState) {
  const [state, setState] = useState(initialState);
  const resetState = () => setState(initialState);
  return [state, setState, resetState];
}

function usePosition(tags) {
  const [position, setPosition, resetPosition] = useResettableState(undefined);

  function movePositionLeft() {
    if (position === 0 || position === undefined) return null;
    if (position === null) return setPosition(tags.length - 1);
    return setPosition(position - 1);
  }

  function movePositionRight() {
    if (position === null || position === undefined) return null;
    return setPosition(position + 1);
  }

  return [position, setPosition, resetPosition, movePositionLeft, movePositionRight];
}

function useTagInputStateAndRefs(tags, ref) {
  const mainRefDefault = useRef();
  const mainRef = ref || mainRefDefault;
  const inputRef = useRef();
  const valueRef = useRef();
  const isActive = useFocusInOut(null, mainRef);

  const state = {
    value: useResettableState(''),
    selection: useResettableState([]),
    position: usePosition(tags),
    isActive,
  };

  const [value, , resetValue] = state.value;
  const [, , resetSelection] = state.selection;
  const [position, , resetPosition] = state.position;

  // --- EFFECTS ---

  // reset value if tags length change
  useEffect(() => {
    if (value) resetValue();
  }, [tags.length]);

  // reset value, position and selection if focus out value area
  useFocusInOut(focused => {
    if (!focused) {
      resetValue();
      resetPosition();
      resetSelection();
    }
  }, valueRef);

  // when position change, or if the component become "active"
  // then focus the input
  useEffect(() => {
    if (position !== undefined && inputRef.current) {
      inputRef.current.focus();
    }
  }, [position, isActive]);

  return [
    state,
    // REFS
    {
      main: mainRef,
      value: valueRef,
      input: inputRef,
    },
  ];
}

const TagInput = React.forwardRef(
  (
    {
      className,
      value: tags = [],
      onChange,
      rounded,
      getTagValue,
      getTagTitle,
      disabled,
      ...props
    },
    ref
  ) => {
    const [state, refs] = useTagInputStateAndRefs(tags, ref);
    const [value, setValue, resetValue] = state.value;
    const [selection, setSelection, resetSelection] = state.selection;
    const [
      position,
      setPosition,
      resetPosition,
      movePositionLeft,
      movePositionRight,
    ] = state.position;

    const isTagEqual = a => b => getTagValue(a) === getTagValue(b);
    const isTagDiff = a => b => !isTagEqual(a)(b);
    const isTagActive = tag => selection.some(isTagEqual(tag));

    const availableTags = props.availableTags(value);
    // remainingTags is the diff between available tags and current tags
    const remainingTags = (availableTags || []).filter(t => !tags.some(isTagEqual(t)));

    // used to defined if a value is valid and ready to be added as new tag
    function match() {
      if (props.match) return props.match(value, tags);

      return availableTags
        ? // availableTags ? let's check if one of them match the value
          remainingTags.some(t => getTagValue(t) === value)
        : // no availableTags ? let's check that this tags does already not exist
          !tags.some(t => getTagValue(t) === value);
    }

    const addToSelection = (...xs) =>
      setSelection([...selection, ...xs].filter((t, i, ts) => i === ts.findIndex(isTagEqual(t))));
    const removeFromSelection = tag => setSelection(selection.filter(isTagDiff(tag)));

    const renderTag =
      props.renderTag || ((tag, tagProps) => <Tag {...tagProps}>{getTagTitle(tag)}</Tag>);

    // function trigger when user press Backspace or Delete with a selection
    function handleRemoveTags(tagsToRemove) {
      const onRemoveTag = props.onRemoveTag || ((t, ts) => ts.filter(isTagDiff(t)));
      const newTags = tagsToRemove.reduce((acc, tag) => onRemoveTag(tag, acc), tags);
      if (newTags !== tags) {
        onChange(newTags);
      }
    }
    useSelectionKeyboardNav(state, handleRemoveTags);

    const onNewTag = props.onNewTag || ((tag, add) => add(tag));

    function handleNewTag(tag) {
      const index = position === null || position === undefined ? tags.length : position;
      const add = t => [...tags.slice(0, index), t, ...tags.slice(index)];
      const newTags = onNewTag(tag, add, index, tags);
      if (newTags !== tags) {
        const focused = position !== undefined;
        if (focused) {
          resetValue();
          if (position !== null && newTags.length > tags.length) {
            setPosition(position + 1);
          }
        }
        onChange(newTags);
      }
    }

    function handleKeyDownInput(e) {
      const val = value;
      if (val) {
        if (e.key === 'Enter' && match()) {
          handleNewTag(val);
        }
        return undefined;
      }
      if (e.key === 'ArrowLeft') return movePositionLeft();
      if (e.key === 'ArrowRight') return movePositionRight();
      if (e.key === 'Backspace' && tags.length && position !== 0) {
        const indexToRemove = position === null ? tags.length - 1 : position - 1;
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        onChange(newTags);
        if (position !== null) setPosition(indexToRemove);
      }
      return undefined;
    }

    function handleClickTag(e, tag, index) {
      if (isTagActive(tag)) {
        removeFromSelection(tag);
      } else {
        const tagsToAdd =
          e.shiftKey && selection.length
            ? sliceArr(tags, tags.findIndex(isTagEqual(selection.slice(-1)[0])), index)
            : [tag];
        addToSelection(...tagsToAdd);
      }
    }

    const input = (
      <input
        ref={refs.input}
        type="text"
        className={bemClass('TagInput__input', {
          empty: !value,
          valid: match(),
        })}
        value={value}
        onChange={e => setValue(e.target.value)}
        size={value ? value.length : 0}
        onFocus={resetSelection}
        onBlur={() => {
          resetValue();
          resetPosition();
        }}
        onKeyDown={handleKeyDownInput}
        disabled={disabled}
      />
    );

    return (
      <div ref={refs.main} className={bemClass('TagInput', {}, className)}>
        <div className="TagInput__tags-list TagInput__tags-list--value" ref={refs.value}>
          <button
            disabled={disabled}
            className="TagInput__button"
            onClick={() => setPosition(null)}
          />
          {tags.map((tag, index) => (
            <Fragment key={getTagValue(tag)}>
              {position === index ? input : <div style={{ width: 1 }} />}
              <div className="TagInput__tag TagInput__tag--value">
                {renderTag(tag, {
                  rounded,
                  active: isTagActive(tag),
                  disabled,
                  onClick: e => handleClickTag(e, tag, index),
                })}
              </div>
            </Fragment>
          ))}
          {position === null || position === undefined ? input : <div style={{ width: 1 }} />}
        </div>
        {!disabled && state.isActive && !!remainingTags.length && (
          <div className="TagInput__tags-list">
            {remainingTags.map(tag => (
              <div key={getTagValue(tag)} className="TagInput__tag">
                {renderTag(tag, {
                  disabled: !getTagValue(tag).includes(value),
                  onClick: () => {
                    handleNewTag(tag);
                    setTimeout(() => setPosition(null), 0);
                  },
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

TagInput.defaultProps = {
  availableTags: () => null,
  getTagValue: tag =>
    typeof tag === 'string' || typeof tag === 'number' ? tag : tag.value || tag.id || tag.key,
  getTagTitle: tag =>
    typeof tag === 'string' || typeof tag === 'number' ? tag : tag.title || tag.name,
};

TagInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
  getTagValue: PropTypes.func,
  getTagTitle: PropTypes.func,
  availableTags: PropTypes.func,
  renderTag: PropTypes.func,
  onNewTag: PropTypes.func,
  onRemoveTag: PropTypes.func,
  match: PropTypes.func,
};

export default TagInput;

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
  const { value, selection, position } = state;

  // create a mutable ref
  const instance = useRef({}).current;
  // store state in instance in order to use it in listener
  instance.state = state;

  useEventListener(useRef(document), 'keyup', e => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onRemoveTag(instance.state.selection.get());

      selection.reset();
      position.set(null);
    }
    if (e.key === 'Escape') {
      e.nativeEvent.stopImmediatePropagation();
      selection.reset();
      position.set(null);
    }

    const isAlphaNum = /^[a-zA-Z0-9-_ ]$/.test(e.key);
    if (isAlphaNum) {
      value.set(e.key);
      selection.reset();
      position.set(null);
    }
  })(!!selection.get().length);
}

function useResettableState(initialState) {
  const [state, setState] = useState(initialState);
  return {
    get: () => state,
    set: x => setState(x),
    reset: () => setState(initialState),
  };
}

function usePosition(tags) {
  const position = useResettableState(undefined);
  const pos = position.get();
  return {
    ...position,
    moveLeft() {
      if (pos === 0 || pos === undefined) return null;
      if (pos === null) return position.set(tags.length - 1);
      return position.set(pos - 1);
    },
    moveRight() {
      if (pos === null || pos === undefined) return null;
      return position.set(pos + 1);
    },
  };
}

function useTagInputStateAndRefs(tags, ref) {
  const mainRefDefault = useRef();
  const mainRef = ref || mainRefDefault;
  const inputRef = useRef();
  const valueRef = useRef();
  const isActive = useFocusInOut(null, mainRef);

  const value = useResettableState('');
  const selection = useResettableState([]);
  const position = usePosition(tags);

  // --- EFFECTS ---

  // reset value if tags length change
  useEffect(() => {
    if (value) value.reset();
  }, [tags.length]);

  // reset value, position and selection if focus out value area
  useFocusInOut(focused => {
    if (!focused) {
      value.reset();
      position.reset();
      selection.reset();
    }
  }, valueRef);

  // when position change, or if the component become "active"
  // then focus the input
  useEffect(() => {
    if (position !== undefined && inputRef.current) {
      inputRef.current.focus();
    }
  }, [position.get(), isActive]);

  return [
    // STATE
    {
      value,
      selection,
      position,
      isActive,
    },
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
    const { value, selection, position } = state;

    console.log(selection.get());

    const isTagEqual = a => b => getTagValue(a) === getTagValue(b);
    const isTagDiff = a => b => !isTagEqual(a)(b);
    const isTagActive = tag => selection.get().some(isTagEqual(tag));

    const availableTags = props.availableTags(value.get());
    // remainingTags is the diff between available tags and current tags
    const remainingTags = (availableTags || []).filter(t => !tags.some(isTagEqual(t)));

    // used to defined if a value is valid and ready to be added as new tag
    function match() {
      if (props.match) return props.match(value.get(), tags);

      return availableTags
        ? // availableTags ? let's check if one of them match the value
          remainingTags.some(t => getTagValue(t) === value.get())
        : // no availableTags ? let's check that this tags does already not exist
          !tags.some(t => getTagValue(t) === value.get());
    }

    const addToSelection = (...xs) =>
      selection.set(
        [...selection.get(), ...xs].filter((t, i, ts) => i === ts.findIndex(isTagEqual(t)))
      );
    const removeFromSelection = tag => selection.set(selection.get().filter(isTagDiff(tag)));

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
      const pos = position.get();
      const index = pos === null || pos === undefined ? tags.length : pos;
      const add = t => [...tags.slice(0, index), t, ...tags.slice(index)];
      const newTags = onNewTag(tag, add, index, tags);
      if (newTags !== tags) {
        const focused = pos !== undefined;
        if (focused) {
          value.reset();
          if (pos !== null && newTags.length > tags.length) {
            position.set(pos + 1);
          }
        }
        onChange(newTags);
      }
    }

    function handleKeyDownInput(e) {
      const val = value.get();
      const pos = position.get();
      if (val) {
        if (e.key === 'Enter' && match()) {
          handleNewTag(val);
        }
        return undefined;
      }
      if (e.key === 'ArrowLeft') return position.moveLeft();
      if (e.key === 'ArrowRight') return position.moveRight();
      if (e.key === 'Backspace' && tags.length && pos !== 0) {
        const indexToRemove = pos === null ? tags.length - 1 : pos - 1;
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        onChange(newTags);
        if (pos !== null) position.set(indexToRemove);
      }
      return undefined;
    }

    function handleClickTag(e, tag, index) {
      if (isTagActive(tag)) {
        removeFromSelection(tag);
      } else {
        const tagsToAdd =
          e.shiftKey && selection.get().length
            ? sliceArr(tags, tags.findIndex(isTagEqual(selection.get().slice(-1)[0])), index)
            : [tag];
        addToSelection(...tagsToAdd);
      }
    }

    const input = (
      <input
        ref={refs.input}
        type="text"
        className={bemClass('TagInput__input', {
          empty: !value.get(),
          valid: match(),
        })}
        value={value.get()}
        onChange={e => value.set(e.target.value)}
        size={value.get() ? value.get().length : 0}
        onFocus={selection.reset}
        onBlur={() => {
          value.reset();
          position.reset();
        }}
        onKeyDown={handleKeyDownInput}
        disabled={disabled}
      />
    );

    const pos = position.get();

    return (
      <div ref={refs.main} className={bemClass('TagInput', {}, className)}>
        <div className="TagInput__tags-list TagInput__tags-list--value" ref={refs.value}>
          <button
            disabled={disabled}
            className="TagInput__button"
            onClick={() => position.set(null)}
          />
          {tags.map((tag, index) => (
            <Fragment key={getTagValue(tag)}>
              {pos === index ? input : <div style={{ width: 1 }} />}
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
          {pos === null || pos === undefined ? input : <div style={{ width: 1 }} />}
        </div>
        {!disabled && state.isActive && !!remainingTags.length && (
          <div className="TagInput__tags-list">
            {remainingTags.map(tag => (
              <div key={getTagValue(tag)} className="TagInput__tag">
                {renderTag(tag, {
                  disabled: !getTagValue(tag).includes(value.get()),
                  onClick: () => {
                    handleNewTag(tag);
                    setTimeout(() => position.set(null), 0);
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

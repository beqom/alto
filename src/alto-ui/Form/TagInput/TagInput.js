import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../helpers/bem';
import Tag from '../../Tag';

import useTagInputStateAndRefs from './hooks/useTagInputStateAndRefs';
import useSelectionKeyboardNav from './hooks/useSelectionKeyboardNav';
import { sliceArr } from './helpers';

import './TagInput.scss';

const TagInput = React.forwardRef(
  (
    {
      className,
      value: selectedTags,
      tags: allTags,
      onChange,
      rounded,
      getTagValue,
      getTagTitle,
      disabled,
      ...props
    },
    ref
  ) => {
    const allTagsByValue = (allTags || []).reduce(
      (acc, t) => ({ ...acc, [getTagValue(t)]: t }),
      {}
    );
    const tags =
      allTags && selectedTags
        ? selectedTags.map(t => allTagsByValue[t]).filter(x => !!x)
        : selectedTags || [];
    const [state, refs] = useTagInputStateAndRefs(tags, ref);

    const { state: value, set: setValue, reset: resetValue } = state.value;
    const { state: selection, set: setSelection, reset: resetSelection } = state.selection;
    const {
      state: position,
      set: setPosition,
      reset: resetPosition,
      moveLeft: movePositionLeft,
      moveRight: movePositionRight,
    } = state.position;

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
        onChange(newTags.map(getTagValue));
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
          if (newTags.length > tags.length) {
            movePositionRight();
          }
        }
        onChange(newTags.map(getTagValue));
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
        onChange(newTags.map(getTagValue));
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
              {position === index ? input : <div className="TagInput__caret-placeholder" />}
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
                  disabled: !getTagTitle(tag).includes(value),
                  onClick: () => {
                    handleNewTag(tag);
                    setPosition(null);
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

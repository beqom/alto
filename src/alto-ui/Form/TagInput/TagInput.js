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
    const [value, setValue] = useState('');
    const [position, setPosition] = useState(undefined);
    const [selection, setSelection] = useState([]);

    const inputRef = useRef();
    const tagInputValueRef = useRef();
    const mainRef = useRef();
    const tagInputRef = ref || mainRef;
    const isActive = useFocusInOut(null, tagInputRef);

    const isTagEqual = a => b => getTagValue(a) === getTagValue(b);
    const isTagDiff = a => b => !isTagEqual(a)(b);
    const isTagActive = tag => selection.some(isTagEqual(tag));

    const availableTags = props.availableTags(value);
    const remainingTags = (availableTags || []).filter(t => !tags.some(isTagEqual(t)));
    const match =
      props.match ||
      (v =>
        availableTags
          ? remainingTags.some(t => getTagValue(t) === v)
          : !tags.some(t => getTagValue(t) === v));

    const addToSelection = (...xs) =>
      setSelection([...selection, ...xs].filter((t, i, ts) => i === ts.findIndex(isTagEqual(t))));
    const removeFromSelection = tag => setSelection(selection.filter(isTagDiff(tag)));

    const renderTag =
      props.renderTag || ((tag, tagProps) => <Tag {...tagProps}>{getTagTitle(tag)}</Tag>);

    const onNewTag = props.onNewTag || ((tag, add) => add(tag));

    const onRemoveTag = props.onRemoveTag || ((t, ts) => ts.filter(isTagDiff(t)));

    const instance = useRef({
      keyupOnDocumentListener(e) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
          instance.removeTagsInSelection();
          setSelection([]);
          setPosition(null);
        }
        if (e.key === 'Escape') {
          e.nativeEvent.stopImmediatePropagation();
          setSelection([]);
          setPosition(null);
        }

        const isAlphaNum = /^[a-zA-Z0-9-_ ]$/.test(e.key);
        if (isAlphaNum) {
          setSelection([]);
          setValue(e.key);
          setPosition(null);
        }
      },
    }).current;

    instance.removeTagsInSelection = () => {
      const newTags = selection.reduce((acc, tag) => onRemoveTag(tag, acc), tags);
      if (newTags !== tags) {
        onChange(newTags);
      }
    };

    useFocusInOut(focused => {
      if (!focused) {
        setValue('');
        setPosition(undefined);
        setSelection([]);
      }
    }, tagInputValueRef);

    useEffect(() => {
      if (position !== undefined && inputRef.current) {
        inputRef.current.focus();
      }
    }, [position, isActive]);

    useEffect(() => {
      if (value) setValue('');
    }, [tags.length]);

    useEventListener(useRef(document), 'keyup', instance.keyupOnDocumentListener)(
      !!selection.length
    );

    function handleNewTag(tag) {
      const index = position === null || position === undefined ? tags.length : position;
      const add = t => [...tags.slice(0, index), t, ...tags.slice(index)];
      const newTags = onNewTag(tag, add, index, tags);
      if (newTags !== tags) {
        const focused = position !== undefined;
        if (focused) {
          setValue('');
          if (position !== null && newTags.length > tags.length) {
            setPosition(position + 1);
          }
        }
        onChange(newTags);
      }
    }

    function handleKeyDownInput(e) {
      if (value) {
        if (e.key === 'Enter' && match(value, tags)) {
          handleNewTag(value);
        }
        return undefined;
      }
      if (e.key === 'ArrowLeft' && position !== 0)
        return setPosition((position || tags.length) - 1);
      if (e.key === 'ArrowRight' && position !== null) {
        if (position < tags.length - 1) return setPosition(position + 1);
        return setPosition(null);
      }
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
        ref={inputRef}
        type="text"
        className={bemClass('TagInput__input', {
          empty: !value,
          valid: match(value, tags),
        })}
        value={value}
        onChange={e => setValue(e.target.value)}
        size={value ? value.length : 0}
        onFocus={() => {
          setSelection([]);
        }}
        onBlur={() => {
          setValue('');
          setPosition(undefined);
        }}
        onKeyDown={handleKeyDownInput}
        disabled={disabled}
      />
    );

    return (
      <div ref={tagInputRef} className={bemClass('TagInput', {}, className)}>
        <div className="TagInput__tags-list TagInput__tags-list--value" ref={tagInputValueRef}>
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
        <div style={{ display: !disabled && isActive ? 'block' : 'none' }}>
          {!!remainingTags.length && (
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

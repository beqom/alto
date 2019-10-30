import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import setWith from 'lodash.setwith';
import clone from 'lodash.clone';

import Sortable from '../Sortable';
import Card from '../Card';
import { bemClass } from '../helpers/bem';
import Media from '../Media';
import Switch from '../Form/Switch';
import Badge from '../Badge';
import Group from '../Group';
import GroupItem from '../Group/GroupItem';
import Actions from '../Actions';
import Avatar from '../Avatar';
import CheckBox from '../Form/CheckBox';
import DragHandle from '../Icons/DragHandle';
import getDefaultItemKey from '../helpers/getItemKey';
import useUniqueKey from '../hooks/useUniqueKey';

import './List.scss';

const setIn = (obj, path, value) => setWith(clone(obj), path, value, clone);

const isInteractive = field =>
  field.interactive || ['actions', 'switch', 'checkbox'].includes(field.type);

const getHandleChange = (items, onChange) => itemIndex => field => value => {
  if (typeof onChange === 'function') {
    const item = setIn(items[itemIndex], field.key, value);
    const newItems = items.map((x, i) => (i === itemIndex ? item : x));
    onChange(newItems, item);
  }
};

const getHandleClick = (items, onClick, onChange) => itemIndex => field => {
  if (typeof onClick === 'function') {
    const setItem = (key, value) => {
      if (typeof onChange === 'function') {
        const item = setIn(items[itemIndex], key, value);
        const newItems = items.map((x, i) => (i === itemIndex ? item : x));
        onChange(newItems, item, itemIndex, value, field);
      }
    };
    onClick(field, items[itemIndex], setItem, itemIndex, items);
  }
};

const getFieldData = (item, field) =>
  get(item, field.key) ||
  (typeof field.defaultValue === 'function' ? field.defaultValue(item, field) : field.defaultValue);

const renderField = (field, item, itemIndex, id, handleChange, onClick, active, { small }) => {
  const data = getFieldData(item, field);
  const value = field.render ? field.render(data, item, field) : data;
  const props =
    typeof field.props === 'function' ? field.props(data, item, itemIndex) : field.props;

  switch (field.type) {
    case 'media':
      return <Media small={small} active={active} title={value} alt={value} {...props} />;
    case 'badge':
    case 'badges':
      return (
        value && (
          <Group splitted items={Array.isArray(value) ? value : [value]}>
            {badge => {
              const key =
                typeof badge === 'string' || typeof badge === 'number'
                  ? badge
                  : badge.id || badge.key;
              const children =
                typeof badge === 'string' || typeof badge === 'number'
                  ? badge
                  : badge.title || badge.name;
              const badgeProps =
                typeof field.elementProps === 'function'
                  ? field.elementProps(badge, data, item, itemIndex)
                  : {};
              return (
                <Badge key={key} {...props} {...badgeProps}>
                  {badgeProps.children || props.children || children}
                </Badge>
              );
            }}
          </Group>
        )
      );
    case 'switch':
      return (
        <Switch
          id={id}
          checked={!!value}
          label={field.key}
          hideLabel
          small={small}
          onChange={handleChange}
          {...props}
        />
      );

    case 'checkbox':
      return (
        <CheckBox
          id={id}
          checked={!!value}
          label={field.key}
          hideLabel
          onChange={e => handleChange(e.target.checked)}
          {...props}
        />
      );
    case 'avatar':
      return <Avatar src={value} small={small} {...props} />;
    case 'actions':
      return <Actions id={id} onClick={onClick} {...props} />;
    default:
      return value;
  }
};

function List(props) {
  const {
    className,
    items,
    sortable,
    onChange,
    onClick,
    splitted,
    small,
    borderless,
    children,
    isSortableDisabled,
    hover,
  } = props;
  const itemKey = getDefaultItemKey(props.itemKey);
  const id = useUniqueKey(props.id);

  const groupConfigProps = {
    column: true,
    splitted,
    items,
  };

  const groupProps = {
    ...groupConfigProps,
    itemKey,
    className: bemClass('List', {}, className),
    id,
  };

  const isActive = (item, itemIndex) => {
    if (typeof props.active === 'function') return props.active(item, itemIndex, items);
    if (Array.isArray(props.active)) return props.active.includes(itemKey(item));
    return itemKey(item) === props.active;
  };

  const isClickable = item => {
    if (typeof props.clickable === 'function') return props.clickable(item);
    return true;
  };

  const handleChange = getHandleChange(items, onChange);
  const handleClick = getHandleClick(items, onClick, onChange);

  const renderChildren = (item, itemIndex) => {
    if (typeof children === 'function') return children(item, itemIndex);
    if (children) return children;
    const nestedItemsKey =
      typeof props.nestedItemsKey === 'function'
        ? props.nestedItemsKey(item)
        : props.nestedItemsKey;
    if (!nestedItemsKey) return null;
    const nestedItems = get(item, nestedItemsKey);
    if (!Array.isArray(nestedItems)) return null;
    return (
      <div className={bemClass('List__item-nested-row', { small, bordered: !borderless })}>
        <List
          {...props}
          id={`${id}__nested-list--${itemKey(item)}`}
          items={nestedItems}
          onChange={handleChange(itemIndex)({ key: nestedItemsKey })}
        />
      </div>
    );
  };

  function renderListItem(defaultItem, dragHandleProps, isDragging, itemIndex) {
    const defaultFields =
      typeof props.fields === 'function' ? props.fields(defaultItem) : props.fields;

    const renderItem = (item = defaultItem, fields = defaultFields) => {
      const active = isActive(item, itemIndex);
      const clickable = isClickable(item);
      return (
        <Card
          key={itemKey(item)}
          borderless={borderless}
          dragging={isDragging}
          className={bemClass('List__item', {
            active,
            hover: hover(item, itemIndex),
            small,
            clickable: !!onClick && clickable,
          })}
        >
          <div className={bemClass('List__item-row', { active: isActive(item, itemIndex), small })}>
            {dragHandleProps && (
              <span
                {...dragHandleProps}
                className={bemClass(
                  dragHandleProps.className,
                  {},
                  bemClass('List__field', { interactive: true, draghandle: true })
                )}
              >
                <DragHandle />
              </span>
            )}
            {fields.map((field, index) => {
              const isPrimaryButton = field.primary && onClick && clickable;
              const Field = isPrimaryButton ? 'button' : 'div';
              const handleClickItem = handleClick(itemIndex);
              const uniqueId = `${id}__item--${itemKey(item)}__field--${field.key}`;

              return (
                <Field
                  key={field.key}
                  id={isPrimaryButton ? `List__field--${uniqueId}` : null}
                  className={bemClass('List__field', {
                    button: isPrimaryButton,
                    primary: field.primary || fields.length === 1,
                    hidden:
                      typeof field.hidden === 'function'
                        ? field.hidden(getFieldData(item, field), item, index)
                        : field.hidden,
                    interactive: isInteractive(field),
                    nowrap: field.nowrap,
                    borderless,
                    small,
                    [field.type || 'untyped']: true,
                  })}
                  onClick={isPrimaryButton ? () => handleClickItem(field) : undefined}
                >
                  {renderField(
                    field,
                    item,
                    index,
                    uniqueId,
                    handleChange(itemIndex)(field),
                    handleClickItem,
                    active,
                    props
                  )}
                </Field>
              );
            })}
          </div>
          {renderChildren(item, itemIndex)}
        </Card>
      );
    };
    return (
      props.renderItem(
        renderItem,
        defaultItem,
        defaultFields,
        itemIndex,
        dragHandleProps,
        isDragging
      ) || null
    );
  }

  if (sortable) {
    return (
      <Sortable
        items={items}
        onChange={onChange}
        itemIdKey={itemKey}
        isItemDisabled={isSortableDisabled}
        renderDroppable={droppableProps => <Group {...droppableProps} {...groupProps} />}
        renderDraggable={(draggableProps, item, dragHandleProps, isDragging, index) => (
          <GroupItem {...groupConfigProps} {...draggableProps} index={index} />
        )}
      >
        {renderListItem}
      </Sortable>
    );
  }
  return (
    /**
     * IE11 doesn't read height of the element with overflow-y: auto;
     * and doesn't triger height for container by children so we need one extra div element
     * https://stackoverflow.com/questions/44311284/container-div-doesnt-resize-correctly-in-internet-explorer-11
     */
    <div>
      <Group {...groupProps}>
        {items.map((item, index) => (
          <GroupItem {...groupConfigProps} key={itemKey(item)} index={index}>
            {renderListItem(item, null, null, index)}
          </GroupItem>
        ))}
      </Group>
    </div>
  );
}

List.displayName = 'List';

List.defaultProps = {
  renderItem: render => render(),
  hover: () => false,
  fields: item => [
    {
      key: 'default',
      primary: true,
      render() {
        if (typeof item === 'string' || typeof item === 'number') return item;
        return item.title || item.name || item.value;
      },
    },
  ],
};

List.propTypes = {
  id: PropTypes.string,
  fields: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
          'media',
          'badge',
          'badges',
          'switch',
          'actions',
          'avatar',
          'checkbox',
          'custom',
        ]),
        hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        props: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        elementProps: PropTypes.func,
        render: PropTypes.func,
      }).isRequired
    ),
    PropTypes.func,
  ]),
  className: PropTypes.string,
  itemKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  items: PropTypes.array,
  sortable: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  splitted: PropTypes.bool,
  active: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.number]),
  small: PropTypes.bool,
  borderless: PropTypes.bool,
  nestedItemsKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.any,
  isSortableDisabled: PropTypes.func,
  renderItem: PropTypes.func,
  hover: PropTypes.func,
  clickable: PropTypes.func,
};

export default List;

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

import './List.scss';
import CheckBox from '../Form/CheckBox';
import DragHandle from '../Icons/DragHandle';

const setIn = (obj, path, value) => setWith(clone(obj), path, value, clone);

const isInteractive = field =>
  field.interactive || ['actions', 'switch', 'checkbox'].includes(field.type);

const getHandleChange = (items, onChange) => itemIndex => field => value => {
  if (typeof onChange === 'function') {
    const item = setIn(items[itemIndex], field.key, value);
    const newItems = items.map((x, i) => (i === itemIndex ? item : x));
    onChange(newItems);
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

const renderField = (field, item, itemIndex, id, handleChange, onClick, { small }) => {
  const data = getFieldData(item, field);
  const value = field.render ? field.render(data, item, field) : data;
  const props =
    typeof field.props === 'function' ? field.props(data, item, itemIndex) : field.props;

  switch (field.type) {
    case 'media':
      return <Media small={small} title={value} alt={value} {...props} />;
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
                typeof field.props === 'function' ? field.props(badge) : field.props || {};
              return (
                <Badge key={key} {...badgeProps}>
                  {badgeProps.children || children}
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
          checked={value}
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
          checked={value}
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
    id,
    className,
    itemKey,
    fields,
    items,
    sortable,
    onChange,
    onClick,
    splitted,
    active,
    small,
    borderless,
    nestedItemsKey,
    children,
  } = props;
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
    if (typeof active === 'function') return active(item, itemIndex, items);
    if (Array.isArray(active)) return active.includes(item[itemKey]);
    return item[itemKey] === active;
  };

  const handleChange = getHandleChange(items, onChange);
  const handleClick = getHandleClick(items, onClick, onChange);

  const renderChildren = (item, itemIndex) => {
    if (typeof children === 'function') return children(item, itemIndex);
    if (children) return children;
    if (!nestedItemsKey) return null;
    const nestedItems = get(item, nestedItemsKey);
    if (!Array.isArray(nestedItems)) return null;
    return (
      <div className={bemClass('List__item-nested-row', { small, bordered: !borderless })}>
        <List
          {...props}
          id={`${id}__nested-list--${item[itemKey]}`}
          items={nestedItems}
          onChange={handleChange(itemIndex)({ key: nestedItemsKey })}
        />
      </div>
    );
  };

  const renderListItem = (item, dragHandleProps, isDragging, itemIndex) => (
    <Card
      key={item[itemKey]}
      borderless={borderless}
      dragging={isDragging}
      className={bemClass('List__item', {
        active: isActive(item, itemIndex),
        small,
        clickable: !!onClick,
      })}
    >
      <div className={bemClass('List__item-row', { active: isActive(item, itemIndex), small })}>
        {dragHandleProps && (
          <span
            {...dragHandleProps}
            className={bemClass('List__field', { interactive: true, draghandle: true })}
          >
            <DragHandle />
          </span>
        )}
        {fields.map((field, index) => {
          const isPrimaryButton = field.primary && onClick;
          const Field = isPrimaryButton ? 'button' : 'div';
          const handleClickItem = handleClick(itemIndex);
          return (
            <Field
              key={field.key}
              className={bemClass('List__field', {
                button: isPrimaryButton,
                primary: field.primary || fields.length === 1,
                hidden:
                  typeof field.hidden === 'function'
                    ? field.hidden(getFieldData(item, field), item, index)
                    : field.hidden,
                interactive: isInteractive(field),
                nowrap: field.nowrap,
                small,
              })}
              onClick={isPrimaryButton ? () => handleClickItem(field) : undefined}
            >
              {renderField(
                field,
                item,
                index,
                `${id}__item--${item[itemKey]}__field--${field.key}`,
                handleChange(itemIndex)(field),
                handleClickItem,
                props
              )}
            </Field>
          );
        })}
      </div>
      {renderChildren(item, itemIndex)}
    </Card>
  );

  if (sortable) {
    return (
      <Sortable
        items={items}
        onChange={onChange}
        itemIdKey={itemKey}
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
    <Group {...groupProps}>
      {items.map((item, index) => (
        <GroupItem {...groupConfigProps} key={item[itemKey]} index={index}>
          {renderListItem(item, null, null, index)}
        </GroupItem>
      ))}
    </Group>
  );
}

List.displayName = 'List';

List.defaultProps = {
  itemKey: 'id',
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
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
      ]),
      hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      props: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      render: PropTypes.func,
    }).isRequired
  ),
  className: PropTypes.string,
  itemKey: PropTypes.string,
  items: PropTypes.array,
  sortable: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  splitted: PropTypes.bool,
  active: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.number]),
  small: PropTypes.bool,
  borderless: PropTypes.bool,
  nestedItemsKey: PropTypes.string,
  children: PropTypes.any,
};

export default List;

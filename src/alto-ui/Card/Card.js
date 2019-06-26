import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import DragHandleIcon from '../Icons/DragHandle';
import useGroupItem from '../Group/useGroupItem';
import Actions from '../Actions';

import './Card.scss';

const Card = props => {
  const {
    className,
    title,
    id,
    children,
    active,
    actions,
    pink,
    indigo,
    teal,
    lime,
    yellow,
    green,
    orange,
    red,
    dragHandleProps,
    borderless,
    dragging,
    ...otherProps
  } = props;

  const hasHeader = !!(title || (actions && actions.length));
  const [groupItem = {}, CleanGroup] = useGroupItem();
  const simple = !hasHeader && !dragHandleProps;

  return (
    <CleanGroup>
      <div
        className={bemClass(
          'Card',
          {
            active,
            'with-header': hasHeader,
            simple,
            pink,
            indigo,
            teal,
            lime,
            yellow,
            orange,
            green,
            red,
            borderless,
            dragging,
            'in-row': groupItem.row,
            'in-column': groupItem.column,
            'first-in-group': groupItem.first,
            'last-in-group': groupItem.last,
          },
          className
        )}
        {...otherProps}
      >
        {hasHeader && (
          <div className="Card__header">
            {dragHandleProps && (
              <DragHandleIcon
                {...dragHandleProps}
                className="Card__drag-handle Card__drag-handle--header"
              />
            )}
            <div className="Card__title">{title}</div>
            <div className="Card__actions">
              <Actions items={actions} id={`${id}__actions`} max={2} />
            </div>
          </div>
        )}
        {dragHandleProps && !hasHeader && (
          <div {...dragHandleProps} className="Card__drag-handle-container">
            <DragHandleIcon className="Card__drag-handle" />
          </div>
        )}
        {simple ? children : <div className="Card__body">{children}</div>}
      </div>
    </CleanGroup>
  );
};

Card.displayName = 'Card';

Card.defaultProps = {};

Card.propTypes = {
  id: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.any,
  active: PropTypes.bool,
  pink: PropTypes.bool,
  indigo: PropTypes.bool,
  teal: PropTypes.bool,
  lime: PropTypes.bool,
  yellow: PropTypes.bool,
  orange: PropTypes.bool,
  red: PropTypes.bool,
  green: PropTypes.bool,
  borderless: PropTypes.bool,
  dragging: PropTypes.bool,
  dragHandleProps: PropTypes.object,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      Icon: PropTypes.any,
      title: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
};

export default Card;

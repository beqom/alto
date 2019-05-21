import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Dropdown from '../Dropdown';
import OptionsIcon from '../Icons/Options';
import DragHandleIcon from '../Icons/DragHandle';

import './Card.scss';

const renderActions = (actions, id) => {
  if (!actions || !actions.length) return null;
  if (actions.length >= 3) {
    return (
      <Dropdown
        end
        small
        id={`card-${id}-dropdown`}
        renderTrigger={(toggle, active, ref) => (
          <div ref={ref}>
            <OptionsIcon onClick={toggle} active={active} outline />
          </div>
        )}
        items={actions.map(action => ({
          key: action.key,
          title: action.title,
          onClick: action.onClick,
        }))}
      />
    );
  }
  return actions.map(({ key, title, Icon, onClick }) => (
    <Icon className="Card__hearder-icon" key={key} title={title} onClick={onClick} />
  ));
};

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
    orange,
    red,
    dragHandleProps,
    ...otherProps
  } = props;

  const modifiers = { pink, indigo, teal, lime, yellow, orange, red };
  const hasHeader = !!(title || (actions && actions.length));
  return (
    <div
      className={bemClass('Card', { active, 'with-header': hasHeader, ...modifiers }, className)}
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
          <div className="Card__actions">{renderActions(actions, id)}</div>
        </div>
      )}
      {dragHandleProps && !hasHeader && (
        <div className="Card__drag-handle-container">
          <DragHandleIcon {...dragHandleProps} className="Card__drag-handle" />
        </div>
      )}
      <div className="Card__body">{children}</div>
    </div>
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

import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Group from '../Group';
import Dropdown from '../Dropdown';
import OptionsIcon from '../Icons/Options';

import './Actions.scss';

function Actions({ className, id, items, max, onClick }) {
  if (!items || !items.length) return null;
  const handleClick = action => (typeof onClick === 'function' ? () => onClick(action) : undefined);
  if (items.length > max) {
    return (
      <Dropdown
        className={bemClass('Actions', {}, className)}
        end
        id={id}
        renderTrigger={(toggle, active, ref) => (
          <div ref={ref}>
            <OptionsIcon onClick={toggle} active={active} />
          </div>
        )}
        selected={items.filter(action => action.active).map(action => action.key)}
        items={items.map(action => ({
          key: action.key,
          title: action.title,
          onClick: action.onClick || handleClick(action),
        }))}
      />
    );
  }
  return (
    <Group className={bemClass('Actions', {}, className)} splitted items={items} itemKey="key">
      {action => {
        const {
          key,
          title,
          Icon: oldIconNameToRemove,
          icon: newIconNameToRefactor,
          ...iconProps
        } = action;
        const Icon = oldIconNameToRemove || newIconNameToRefactor;
        return (
          <Icon
            title={title}
            outline={!iconProps.active}
            onClick={() => {}}
            {...iconProps}
          />
        );
      }}
    </Group>
  );
}

Actions.displayName = 'Actions';

Actions.defaultProps = {
  max: 3,
};

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  max: PropTypes.number,
  onClick: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.any,
      title: PropTypes.string,
      onClick: PropTypes.func,
      active: PropTypes.bool,
    }).isRequired
  ),
};

export default Actions;

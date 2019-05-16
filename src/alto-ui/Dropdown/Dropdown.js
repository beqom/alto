import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Popover from '../Popover';
import ChevronDown from '../Icons/ChevronDown';
import CloseIcon from '../Icons/Close';
import Button from '../Button';
import Spinner from '../Spinner';
import { bemClass } from '../helpers/bem';

import DropdownItem from './components/DropdownItem';
import './Dropdown.scss';

const getFirstItem = ([item]) => (item.items ? getFirstItem(item.items) : item);

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      previousPropOpen: props.open,
      open: props.open,
    };

    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.triggerRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.previousPropOpen !== props.open) {
      return {
        previousPropOpen: props.open,
        open: props.open,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const stopLoading = prevProps.loadingItems && !this.props.loadingItems;
    const openFocusTargetId = this.getOpenFocusTriggerId();
    if (this.state.open && stopLoading && openFocusTargetId) {
      const node = document.getElementById(openFocusTargetId);
      if (node) node.focus();
    }
  }

  getTriggerRef() {
    return this.props.triggerRef || this.triggerRef;
  }

  getItemId(item) {
    return `${this.props.id}__item--${item.key}`;
  }

  getOpenFocusTriggerId() {
    const { openFocusTargetId, items } = this.props;
    if (openFocusTargetId) return openFocusTargetId;
    if (!items || !items.length) return null;
    return this.getItemId(getFirstItem(items));
  }

  isSelected(key) {
    const { selected } = this.props;
    return Array.isArray(selected) ? selected.includes(key) : key === selected;
  }

  close() {
    this.toggle(false);
  }

  handleClose() {
    const { onClose } = this.props;
    if (onClose) {
      onClose(this.close);
    } else {
      this.close();
    }
  }

  toggle(newState) {
    const open = typeof newState === 'boolean' ? newState : !this.state.open;
    if (open && this.props.onOpen) {
      this.props.onOpen();
    }
    this.setState({ open });
  }

  renderTrigger() {
    const {
      id,
      renderTrigger,
      defaultLabel,
      label,
      items,
      loading,
      loadingItems,
      small,
      large,
      className,
      selected,
      icon: Icon,
      active,
      onClear,
    } = this.props;
    const { open } = this.state;
    const triggerId = `${id}__trigger`;

    if (typeof renderTrigger === 'function') {
      return renderTrigger(this.toggle, this.state.open, this.getTriggerRef(), triggerId);
    }

    const text =
      label || ((items || []).find(({ key }) => this.isSelected(key)) || {}).title || defaultLabel;

    const selectedKeys = Array.isArray(selected) ? selected : [selected];
    const hasValue = (items || []).some(({ key }) => selectedKeys.includes(key));
    const clearable = hasValue && onClear && !!text;

    return (
      <div className={bemClass('Dropdown__wrapper-trigger', { clearable })}>
        <Button
          id={triggerId}
          ref={this.getTriggerRef()}
          small={small}
          large={large}
          flat
          active={this.state.open || active}
          className={bemClass(
            'Dropdown__trigger',
            { clearable },
            className ? `${className}-trigger` : ''
          )}
          onClick={this.toggle}
        >
          {Icon && <Icon left={!!text} />}
          <span className="Dropdown__trigger-content">{text}</span>
          {(loading && !loadingItems) || (loadingItems && !open) ? (
            <Spinner className="Dropdown__trigger-spinner" small />
          ) : (
            !clearable && (
              <div className="Dropdown__icon-trigger">
                <ChevronDown />
              </div>
            )
          )}
        </Button>
        {clearable && (
          <button
            className="Dropdown__icon-trigger Dropdown__icon-trigger--clear"
            onClick={onClear}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }

  renderItem(popoverProps) {
    return (item, selected) => {
      if (item.items && item.section) {
        return (
          <div className="Dropdown__section">
            <div className="Dropdown__section-title">{item.title}</div>
            <ul className="Dropdown__section-items">
              {this.renderItems(popoverProps, item.items)}
            </ul>
          </div>
        );
      }
      return (
        <DropdownItem
          id={this.getItemId(item)}
          item={item}
          selected={selected}
          dropdownProps={this.props}
          popoverProps={popoverProps}
          onClose={this.handleClose}
        />
      );
    };
  }

  renderItems(popoverProps, items) {
    const renderItem = this.renderItem(popoverProps);
    return items.map(item => (
      <li key={item.key} className="Dropdown__item">
        {renderItem(item, this.isSelected(item.key))}
      </li>
    ));
  }

  renderList(popoverProps) {
    const { items, loadingItems } = this.props;
    const hasItems = Array.isArray(items) && !!items.length;
    if (loadingItems) {
      return (
        <div className="Dropdown__items-spinner">
          <Spinner centered />
        </div>
      );
    }
    if (!hasItems) return null;

    return <ul className="Dropdown__list">{this.renderItems(popoverProps, items)}</ul>;
  }

  render() {
    const {
      className,
      items,
      onOpen,
      onClose,
      renderTrigger,
      children,
      selected,
      onClick,
      getItems,
      defaultLabel,
      onSaveEdit,
      invalidateEdit,
      loading,
      loadingItems,
      small,
      large,
      mediumWidth,
      narrow,
      triggerRef,
      icon,
      active,
      onClear,
      closeFocusTargetId,
      ...popoverProps
    } = this.props;

    const renderContent = typeof children === 'function' ? children : list => children || list;
    return (
      <Fragment>
        {this.renderTrigger()}
        <Popover
          start={!renderTrigger && !popoverProps.middle && !popoverProps.end}
          targetRef={this.getTriggerRef()}
          {...popoverProps}
          className={bemClass('Dropdown', { small, large, mediumWidth, narrow }, className)}
          baseClassName="Dropdown"
          open={this.state.open}
          onClose={this.handleClose}
          openFocusTargetId={this.getOpenFocusTriggerId()}
          closeFocusTargetId={closeFocusTargetId || `${this.props.id}__trigger`}
        >
          {renderContent(this.renderList(popoverProps), this.handleClose)}
        </Popover>
      </Fragment>
    );
  }
}

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  open: false,
  getItems: () => null,
};

const keyPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired;

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  renderTrigger: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: keyPropType,
    }).isRequired
  ),
  onSelect: PropTypes.func,
  label: PropTypes.any,
  defaultLabel: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.arrayOf(keyPropType), keyPropType]),
  getItems: PropTypes.func,
  onSaveEdit: PropTypes.func,
  invalidateEdit: PropTypes.func,
  loading: PropTypes.bool,
  loadingItems: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  mediumWidth: PropTypes.bool,
  narrow: PropTypes.bool,
  triggerRef: PropTypes.object,
  icon: PropTypes.func,
  active: PropTypes.bool,
  onClear: PropTypes.func,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string,
};

export default Dropdown;

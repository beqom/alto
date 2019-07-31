import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '../Icons/ChevronLeft';
import VisuallyHidden from '../VisuallyHidden';
import Button from '../Button';
import Link from '../Link';
import Tooltip from '../Tooltip';
import { bemClass } from '../helpers/bem';

import './SideNav.scss';

const DEFAULT_LABELS = {
  a11yLogo: 'Company logo',
};

export const SideNavContext = React.createContext();

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleToggleOpen = this.handleToggleOpen.bind(this);
  }

  handleToggleOpen() {
    this.setState(({ open }) => ({ open: !open }));
  }

  renderItemContent(item) {
    const active = item.active || this.props.currentUrl.indexOf(item.url) === 0;
    const itemContent = (
      <div className="sidenav__section-item">
        {item.icon && (
          <div className="sidenav__section-item-icon">
            <item.icon outline badged={item.badged} />
          </div>
        )}
        {this.props.collapsed ? (
          <VisuallyHidden> {item.title} </VisuallyHidden>
        ) : (
          <div className="sidenav__section-item-title">{item.title}</div>
        )}
      </div>
    );

    if (!item.url && item.onClick) {
      return (
        <Button
          flat
          id={`${this.props.id}__${item.id}__link`}
          className={bemClass('sidenav__section-button', { active })}
          onClick={item.onClick}
          active={item.active}
        >
          {itemContent}
        </Button>
      );
    }

    return (
      <Link
        id={`${this.props.id}__${item.id}__link`}
        href={item.url}
        className={bemClass('sidenav__route-link', {
          active,
        })}
      >
        {itemContent}
      </Link>
    );
  }

  renderItem(item) {
    if (this.props.collapsed) {
      return (
        <Tooltip right content={item.title}>
          {this.renderItemContent(item)}
        </Tooltip>
      );
    }
    return this.renderItemContent(item);
  }

  renderNavItems(items) {
    const { collapsed } = this.props;
    return (items || []).map(item => (
      <li
        id={`${this.props.id}__${item.id}`}
        className={bemClass('sidenav__section', { collapsed })}
        key={item.id}
      >
        {this.renderItem(item)}
      </li>
    ));
  }

  render() {
    const { open } = this.state;
    const {
      logoUrl,
      logoSmall,
      logo,
      openMenuButtonLabel,
      closeMenuButtonLabel,
      children,
      dark,
      id,
      color,
      expandButtonLabel,
      collapseButtonLabel,
      collapsed,
      onToggle,
      secondaryItems,
      items,
    } = this.props;
    const labels = {
      ...DEFAULT_LABELS,
      ...this.props.labels,
    };

    return (
      <SideNavContext.Provider value={{ open, collapsed }}>
        <aside id={id} className={bemClass('sidenav', { collapsed, dark, [color]: true })}>
          <header className="sidenav__header">
            <a id={`${id}__logo`} className="sidenav__logo" href={logoUrl} title={labels.a11yLogo}>
              {collapsed ? logoSmall : logo}
            </a>
            <a
              id={`${id}__logo--narrow`}
              className="sidenav__logo sidenav__logo--narrow"
              href={logoUrl}
              title={labels.a11yLogo}
            >
              {logo}
            </a>
          </header>
          <div className="sidenav__sections-container">
            <ul className="sidenav__sections-list">{this.renderNavItems(items)}</ul>

            {!!children && (
              <div className="sidenav__content">
                {typeof children === 'function' ? children(open) : children}
              </div>
            )}
            <div className="sidenav__sections-list sidenav__sections-list--secondary">
              {this.renderNavItems(secondaryItems)}
            </div>
          </div>
          <div className="sidenav__narrow">
            <div
              className={bemClass('sidenav__sections-list-narrow-container', {
                open,
              })}
              aria-hidden={!open}
            >
              <ul
                className={bemClass('sidenav__sections-list-narrow', { open })}
                aria-hidden={!open}
              >
                {this.renderNavItems(items)}
                {this.renderNavItems(secondaryItems)}
              </ul>
            </div>
            <Button
              id={`${id}__menu-button`}
              flat
              white={dark}
              onClick={this.handleToggleOpen}
              className="sidenav__menu-button"
            >
              {open ? closeMenuButtonLabel : openMenuButtonLabel}
            </Button>
          </div>

          {onToggle && (
            <div
              className={bemClass(
                'sidenav__icon-container',
                { reverse: collapsed },
                'sidenav__toggle-button-container'
              )}
            >
              <button
                id={`${id}__collapse-button`}
                className={bemClass('sidenav__toggle-button')}
                onClick={onToggle}
                aria-expanded={collapsed}
              >
                <ChevronLeftIcon className="sidenav__toggle-icon" />
                <VisuallyHidden>
                  {collapsed ? expandButtonLabel : collapseButtonLabel}
                </VisuallyHidden>
              </button>
            </div>
          )}
        </aside>
      </SideNavContext.Provider>
    );
  }
}

SideNav.displayName = 'SideNav';

SideNav.defaultProps = {
  dark: false,
  id: 'sidenav',
  collapsed: false,
};

SideNav.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  logo: PropTypes.any,
  color: PropTypes.string.isRequired,
  logoSmall: PropTypes.any,
  logoUrl: PropTypes.string,
  currentUrl: PropTypes.string,
  dark: PropTypes.bool,
  expandButtonLabel: PropTypes.string.isRequired,
  collapseButtonLabel: PropTypes.string.isRequired,
  openMenuButtonLabel: PropTypes.string.isRequired,
  closeMenuButtonLabel: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
        .isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      onClick: PropTypes.func,
      active: PropTypes.bool,
      badged: PropTypes.bool,
    })
  ).isRequired,
  secondaryItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
        .isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      onClick: PropTypes.func,
      active: PropTypes.bool,
      badged: PropTypes.bool,
    })
  ),
  collapsed: PropTypes.bool,
  onToggle: PropTypes.func,
  labels: PropTypes.object,
};

export default SideNav;

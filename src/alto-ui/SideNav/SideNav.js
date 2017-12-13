import React from 'react';
import PropTypes from 'prop-types';

import ArrowLeftIcon from '../Icons/ArrowLeft';
import ChevronDownIcon from '../Icons/ChevronDown';
import VisuallyHidden from '../VisuallyHidden';
import Button from '../Button';
import { bemClass } from '../helpers/bem';

import './SideNav.scss';

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      open: false,
      sectionsOpenState: {},
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
  }

  handleToggle() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  }

  handleToggleSection(title) {
    if (this.state.collapsed) {
      this.setState(() => ({
        collapsed: false,
        sectionsOpenState: {
          [title]: true,
        },
      }));
    } else {
      this.setState(({ sectionsOpenState }) => ({
        sectionsOpenState: Object.assign({}, sectionsOpenState, {
          [title]: !sectionsOpenState[title],
        }),
      }));
    }
  }

  handleToggleOpen() {
    this.setState(({ open }) => ({ open: !open }));
  }

  renderNavSubItems(items, open) {
    // if (this.state.collapsed) return [];

    return items.map(item => (
      <li key={item.title}>
        <a
          href={item.url}
          className={bemClass('SideNav__route-link', {
            active: this.props.currentUrl.indexOf(item.url) === 0,
          })}
          tabIndex={open ? 0 : -1}
        >
          {item.title}
        </a>
      </li>
    ));
  }

  renderNavItems() {
    const { collapsed } = this.state;
    return this.props.items.map(item => {
      const open = !this.state.collapsed && !!this.state.sectionsOpenState[item.title];
      const active = !!item.items.find(({ url }) => this.props.currentUrl.indexOf(url) === 0);
      return (
        <li className="Sidebar__section" key={item.title}>
          <button
            className={bemClass('SideNav__section-button', { collapsed, active })}
            onClick={() => this.handleToggleSection(item.title)}
          >
            <div className="SideNav__section-item">
              {item.icon && (
                <div className="SideNav__section-item-icon">
                  <item.icon outline />
                </div>
              )}
              <div className="SideNav__section-item-title">{item.title}</div>
              <div
                className={bemClass(
                  'SideNav__icon-container',
                  { reverse: open },
                  'SideNav__section-item-chevron'
                )}
              >
                <ChevronDownIcon />
              </div>
            </div>
          </button>
          <ul
            className="SideNav__sub-list"
            style={{ height: `${open ? item.items.length * 2.5 + 1 : 0}rem` }}
            aria-hidden={!open}
          >
            {this.renderNavSubItems(item.items, open)}
          </ul>
        </li>
      );
    });
  }

  render() {
    const { collapsed, open } = this.state;
    const {
      expandButtonLabel,
      collapseButtonLabel,
      logoUrl,
      logoSmall,
      logo,
      openMenuButtonLabel,
      closeMenuButtonLabel,
    } = this.props;
    return (
      <aside className={bemClass('SideNav', { collapsed })}>
        <header className="SideNav__header">
          <a className="SideNav__logo" href={logoUrl}>
            {collapsed ? logoSmall : logo}
          </a>
          <a className="SideNav__logo SideNav__logo--narrow" href={logoUrl}>
            {logo}
          </a>
          <Button outline white onClick={this.handleToggleOpen} className="SideNav__menu-button">
            {open ? closeMenuButtonLabel : openMenuButtonLabel}
          </Button>
        </header>
        <ul className="SideNav__sections-list">{this.renderNavItems()}</ul>
        <ul className={bemClass('SideNav__sections-list-narrow', { open })} aria-hidden={!open}>
          {this.renderNavItems()}
        </ul>
        <button
          className={bemClass(
            'SideNav__icon-container',
            { reverse: collapsed },
            'SideNav__toggle-button'
          )}
          onClick={this.handleToggle}
          aria-expanded={collapsed}
        >
          <ArrowLeftIcon />
          <VisuallyHidden>{collapsed ? expandButtonLabel : collapseButtonLabel}</VisuallyHidden>
        </button>
      </aside>
    );
  }
}

SideNav.displayName = 'SideNav';

SideNav.defaultProps = {};

SideNav.propTypes = {
  logo: PropTypes.any,
  logoSmall: PropTypes.any,
  logoUrl: PropTypes.string,
  currentUrl: PropTypes.string,
  expandButtonLabel: PropTypes.string.isRequired,
  collapseButtonLabel: PropTypes.string.isRequired,
  openMenuButtonLabel: PropTypes.string.isRequired,
  closeMenuButtonLabel: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          url: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default SideNav;

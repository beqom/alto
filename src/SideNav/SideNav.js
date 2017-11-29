import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, getTheme, fontSize, respondAbove, respondBelow } from '../helpers/theme';

import ArrowLeftIcon from '../Icons/ArrowLeft';
import ChevronDownIcon from '../Icons/ChevronDown';
import VisuallyHidden from '../VisuallyHidden';
import Button, { resetButton } from '../Button';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const sideNavIconContainerCSS = css`
  display: flex;

  i {
    margin: auto;
    transition: transform ${getTheme('transition')};

    ${props => props.reverse && css`transform: rotate(-180deg);`};
  }
`;

const SideNavContainer = styled.aside`
  background-color: ${getColor('coolGrey.90')};
  display: flex;
  flex-direction: column;
  transition: width ${getTheme('transition')};

  ${respondAbove('narrow')(css`
    width: 200px;
    height: 100%;
    ${modifier('collapsed')('width: 3.125rem;')};
  `)};
`;

const SideNavButton = styled.button`
  ${resetButton};
  line-height: 2;
  color: ${getColor('primary.10')};
  width: 100%;
  display: flex;
  height: 3.125rem;
  cursor: pointer;
  transition: background-color ${getTheme('transition')}, box-shadow ${getTheme('transition')},
    color ${getTheme('transition')}, border-color ${getTheme('transition')};

  :focus {
    box-shadow: inset 0 0 0 2px ${getColor('brand')};
  }

  :hover {
    background-color: ${getColor('brand')};
  }

  ${modifier('active')(css`
    background-color: ${getColor('brand')};
  `)};
`;

const SideNavHeader = styled.header`
  display: flex;
  align-items: center;
  box-shadow: inset 0 5px 0 ${getColor('brand')};
  border-bottom: 1px solid ${getColor('coolGrey.80')};

  ${respondBelow('narrow')(css`
    padding: 0 20px;
    background-color: ${getColor('coolGrey.90')};
    position: relative;
    z-index: 1;
  `)};
`;

const SideNavLogo = styled.a`
  ${fontSize('xlarge')};
  font-weight: 300;
  display: block;
  text-align: center;
  line-height: 3.125;
  height: 80px;
  overflow: hidden;
  color: white;
  transition: color ${getTheme('transition')};
  flex: 1;

  :hover {
    color: ${getColor('brand')};
  }

  ${respondBelow('narrow')(`
    text-align: left;
  `)};
`;

const SideNavMenuButton = Button.extend`${respondAbove('narrow')(css`display: none;`)};`;

const SideNavToggleButton = SideNavButton.extend`
  ${sideNavIconContainerCSS};
  ${fontSize('xlarge')};

  ${respondBelow('narrow')('display: none')};
`;

const SideNavSectionList = styled.ul`
  color: white;
  border-bottom: 1px solid ${getColor('coolGrey.80')};
  flex: 1;
  list-style: none;
  overflow: auto;

  ${respondBelow('narrow')(css`
    position: fixed;
    background-color: ${getColor('coolGrey.90')};
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    transition: transform ${getTheme('transition')};

    ${modifier('open')('transform: translateY(0);')};
  `)};
`;

const SideNavSection = styled.li`position: relative;`;

const SideNavSectionButton = SideNavButton.extend`
  display: block;
  overflow: hidden;
  transition: all ${getTheme('transition')};

  box-shadow: inset 0 0 0 ${getColor('brand')};

  ${respondAbove('narrow')(css`
    width: 200px;
    ${modifier('collapsed')('width: 3.125rem;')};
  `)};

  ${modifier('active')(css`
    background-color: ${getColor('coolGrey.80')};
    box-shadow: inset -5px 0 0 ${getColor('brand')};
    :focus {
      box-shadow: inset 0 0 0 2px ${getColor('brand')};
    }
  `)};
`;

const SideNavSectionItem = styled.div`
  display: flex;
  align-items: center;
  ${respondAbove('narrow')('width: 200px;')};
`;

const SideNavSectionItemIcon = styled.div`
  ${fontSize('xlarge')};
  width: 3.25rem;
  display: flex;
  transition: width ${getTheme('transition')};

  i {
    margin: auto;
  }
`;

const SideNavSectionItemTitle = styled.div`
  ${fontSize('large')};
  flex: 1;
  font-weight: 600;
  text-align: left;
`;

const SideNavSectionItemChevron = styled.div`
  ${sideNavIconContainerCSS};
  ${fontSize('small')};
  width: 3.25rem;
`;

const SideNavItemSubList = styled.ul`
  list-style: none;
  ${fontSize('medium')};
  overflow: hidden;
  transition: height ${getTheme('transition')};
  height: ${props => (props.open ? props.children.length * 2.5 + 1 : 0)}rem;
`;

const styleLinkComponent = component => SideNavSectionButton.withComponent(component).extend`
  line-height: 2.5rem;
  height: 2.5rem;
  padding-left: 3.25rem;
  font-weight: 600;
`;

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
    this.LinkComponent = styleLinkComponent(this.props.linkComponent);
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
        {this.props.children(
          this.LinkComponent,
          {
            tabIndex: open ? 0 : -1,
            children: item.title,
            active: this.props.currentUrl === item.url,
          },
          item
        )}
      </li>
    ));
  }

  renderNavItems() {
    const { collapsed } = this.state;

    return this.props.items.map(item => {
      const open = !this.state.collapsed && !!this.state.sectionsOpenState[item.title];
      const active = !!item.items.find(({ url }) => url === this.props.currentUrl);
      return (
        <SideNavSection key={item.title}>
          <SideNavSectionButton
            onClick={() => this.handleToggleSection(item.title)}
            collapsed={collapsed}
            active={active}
          >
            <SideNavSectionItem>
              {item.icon && (
                <SideNavSectionItemIcon collapsed={collapsed}>
                  <item.icon outline />
                </SideNavSectionItemIcon>
              )}
              <SideNavSectionItemTitle>{item.title}</SideNavSectionItemTitle>
              <SideNavSectionItemChevron reverse={open}>
                <ChevronDownIcon />
              </SideNavSectionItemChevron>
            </SideNavSectionItem>
          </SideNavSectionButton>
          <SideNavItemSubList collapsed={collapsed} open={open} aria-hidden={!open}>
            {this.renderNavSubItems(item.items, open)}
          </SideNavItemSubList>
        </SideNavSection>
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
      <SideNavContainer collapsed={collapsed}>
        <SideNavHeader>
          <SideNavLogo href={logoUrl}>{collapsed ? logoSmall : logo}</SideNavLogo>
          <SideNavMenuButton outline inverse onClick={this.handleToggleOpen}>
            {open ? closeMenuButtonLabel : openMenuButtonLabel }
          </SideNavMenuButton>
        </SideNavHeader>
        <SideNavSectionList open={open}>{this.renderNavItems()}</SideNavSectionList>
        <SideNavToggleButton
          onClick={this.handleToggle}
          reverse={collapsed}
          aria-expanded={collapsed}
        >
          <ArrowLeftIcon />
          <VisuallyHidden>{collapsed ? expandButtonLabel : collapseButtonLabel}</VisuallyHidden>
        </SideNavToggleButton>
      </SideNavContainer>
    );
  }
}

SideNav.displayName = 'SideNav';

SideNav.defaultProps = {
  linkComponent: 'a',
  children: (Component, props, item) => <Component {...props} href={item.url} />,
};

SideNav.propTypes = {
  logo: PropTypes.any,
  logoSmall: PropTypes.any,
  logoUrl: PropTypes.string,
  children: PropTypes.func,
  currentUrl: PropTypes.string,
  linkComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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

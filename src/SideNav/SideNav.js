import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, getTheme, fontSize } from '../helpers/theme';

import ArrowLeftIcon from '../Icons/ArrowLeft';
import ChevronDownIcon from '../Icons/ChevronDown';
import { resetButton } from '../Button';

const sideNavIconContainerCSS = css`
  display: flex;

  i {
    margin: auto;
    transition: transform ${getTheme('transition')};

    ${props => props.reverse && css`transform: rotate(-180deg);`};
  }
`;

const SideNavContainer = styled.aside`
  height: 100%;
  width: 200px;
  background-color: ${getColor('primary.80')};
  display: flex;
  flex-direction: column;
  transition: width ${getTheme('transition')};

  ${props => props.collapsed && css`width: 72px;`};
`;

const SideNavButton = styled.button`
  ${resetButton};
  line-height: 2;
  color: ${getColor('primary.10')};
  width: 100%;
  display: flex;
  height: 3.25rem;
  cursor: pointer;
  transition: background ${getTheme('transition')}, color ${getTheme('transition')},
    border-color ${getTheme('transition')};

  :hover {
    background-color: ${getColor('primary.70')};
  }

  :focus {
    box-shadow: inset 0 0 0 3px ${getColor('primary.60')};
  }
`;

const SideNavLogo = SideNavButton.withComponent('a').extend`
  ${fontSize('xlarge')};
  font-weight: 300;
  display: block;
  text-align: center;
  line-height: 3.125;
  height: 3.125em;
  overflow: hidden;
  color: white;
  border-bottom: 1px solid ${getColor('primary.70')};
`;

const SideNavIconButton = SideNavButton.extend`
  ${sideNavIconContainerCSS};
  ${fontSize('xlarge')};
`;

const SideNavItemList = styled.ul`
  color: white;
  border-bottom: 1px solid ${getColor('primary.70')};
  flex: 1;
  list-style: none;
`;

const SideNavSection = styled.li`position: relative;`;

const SideNavSectionButton = SideNavButton.extend`
  display: block;
  width: 200px;
  overflow: hidden;
  transition: width ${getTheme('transition')};

  ${props => props.collapsed && css`width: 72px;`};
`;

const SideNavSectionItem = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
`;

const SideNavSectionItemIcon = styled.div`
  ${fontSize('xlarge')};
  width: 3.25rem;
  display: flex;
  transition: width ${getTheme('transition')};

  ${props => props.collapsed && css`width: 72px;`};

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
  background-color: ${getColor('primary.90')};
  overflow: hidden;
  transition: height ${getTheme('transition')};


  ${props => (props.collapsed ? css`
    display: none;

    ${props.open && css`
      position: absolute;
      left: 100%;
      top: 0;
      padding: 1rem 2rem;
      display: block;
    `}
  ` : css`
    height: ${props.open ? props.children.length * 2.5 + 1 : 0}rem;
    padding-left: 3.25rem;
    > li:first-child {
      margin-top: 0.5rem;
    }
  `)};

`;

const SideNavSubItem = styled.div`
  text-decoration: none;
  color: white;
  font-weight: 600;
  line-height: 2.5rem;

  :hover,
  :active {
    color: white;
  }

  ${props => props.current && css`color: white;`};
`;

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      sectionOpen: null,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  }

  handleToggleSection(title) {
    this.setState(({ sectionOpen }) => ({
      sectionOpen: sectionOpen === title ? null : title,
    }));
  }

  renderNavSubItems(items, open) {
    return items.map(item => (
      <li key={item.title}>
        {this.props.children(
          { tabIndex: open ? 0 : -1 },
          item,
          <SideNavSubItem>{item.title}</SideNavSubItem>
        )}
      </li>
    ));
  }

  renderNavItems() {
    const { collapsed } = this.state;

    return this.props.items.map(item => {
      const open = this.state.sectionOpen === item.title;
      return (
        <SideNavSection key={item.title}>
          <SideNavSectionButton onClick={() => this.handleToggleSection(item.title)} collapsed={collapsed}>
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
    const { collapsed } = this.state;
    return (
      <SideNavContainer collapsed={collapsed}>
        <SideNavLogo href={this.props.logoUrl}>
          {collapsed ? this.props.logoSmall : this.props.logo}
        </SideNavLogo>
        <SideNavItemList>{this.renderNavItems()}</SideNavItemList>
        <SideNavIconButton onClick={this.handleToggle} reverse={collapsed}>
          <ArrowLeftIcon />
        </SideNavIconButton>
      </SideNavContainer>
    );
  }
}

SideNav.displayName = 'SideNav';

SideNav.defaultProps = {
  children: (props, item, content) => (
    <a {...props} href={item.url}>
      {content}
    </a>
  ),
};

SideNav.propTypes = {
  logo: PropTypes.any,
  logoSmall: PropTypes.any,
  logoUrl: PropTypes.string,
  children: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  })).isRequired,
};

export default SideNav;

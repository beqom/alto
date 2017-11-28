import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, getTheme, fontSize } from '../helpers/theme';

import ArrowLeftIcon from '../Icons/ArrowLeft';
import ChevronDownIcon from '../Icons/ChevronDown';
import VisuallyHidden from '../VisuallyHidden';
import { resetButton } from '../Button';

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
  height: 100%;
  width: 200px;
  background-color: ${getColor('coolGrey.90')};
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

const SideNavLogo = SideNavButton.withComponent('a').extend`
  ${fontSize('xlarge')};
  font-weight: 300;
  display: block;
  text-align: center;
  line-height: 3.125;
  height: 3.125em;
  overflow: hidden;
  color: white;
  border-bottom: 1px solid ${getColor('coolGrey.80')};
  box-shadow: inset 0 5px 0 ${getColor('brand')};
`;

const SideNavIconButton = SideNavButton.extend`
  ${sideNavIconContainerCSS};
  ${fontSize('xlarge')};
`;

const SideNavSectionList = styled.ul`
  color: white;
  border-bottom: 1px solid ${getColor('coolGrey.80')};
  flex: 1;
  list-style: none;
  overflow: auto;
`;

const SideNavSection = styled.li`position: relative;`;

const SideNavSectionButton = SideNavButton.extend`
  display: block;
  width: 200px;
  overflow: hidden;
  transition: all ${getTheme('transition')};

  box-shadow: inset 0 0 0 ${getColor('brand')};

  ${props => props.collapsed && css`width: 72px;`};

  ${modifier('active')(css`
    box-shadow: inset -5px 0 0 ${getColor('brand')}, inset -200px 0 0 ${getColor('coolGrey.80')};
    :focus {
      box-shadow: inset 0 0 0 2px ${getColor('brand')}, inset -200px 0 0 ${getColor('coolGrey.80')};
    }
  `)};
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

  ${modifier('collapsed')(css`
    width: 72px;
  `)};

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
      sectionsOpenState: {},
    };

    this.handleToggle = this.handleToggle.bind(this);
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
    const { collapsed } = this.state;
    const { expandButtonLabel, collapseButtonLabel, logoUrl, logoSmall, logo } = this.props;
    return (
      <SideNavContainer collapsed={collapsed}>
        <SideNavLogo href={logoUrl}>{collapsed ? logoSmall : logo}</SideNavLogo>
        <SideNavSectionList>{this.renderNavItems()}</SideNavSectionList>
        <SideNavIconButton
          onClick={this.handleToggle}
          reverse={collapsed}
          aria-expanded={collapsed}
        >
          <ArrowLeftIcon />
          <VisuallyHidden>{collapsed ? expandButtonLabel : collapseButtonLabel}</VisuallyHidden>
        </SideNavIconButton>
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

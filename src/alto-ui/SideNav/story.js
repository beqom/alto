/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';

import SideNav from './SideNav';
import SideNavPanel from './SideNavPanel';

import LightbulbIcon from '../Icons/Lightbulb';
import BoltIcon from '../Icons/Bolt';
import ObjectsIcon from '../Icons/Objects';
import Avatar from '../Avatar';

const items = [
  {
    id: 1,
    title: 'Numbers',
    icon: LightbulbIcon,
    items: [
      { id: 12, title: 'One', url: '#one' },
      { id: 13, title: 'Two', url: '#two' },
      { id: 14, title: 'Three', url: '#three' },
      { id: 15, title: 'Four', url: '#four' },
      { id: 16, title: 'Five', url: '#five' },
    ],
  },
  {
    id: 2,
    title: 'Fruits',
    icon: BoltIcon,
    items: [
      { id: 21, title: 'Apple', url: '#apple/foo' },
      { id: 22, title: 'Banana', url: '#banana' },
      { id: 23, title: 'Orange', url: '#orange' },
    ],
  },
  {
    id: 3,
    title: 'FBB',
    icon: ObjectsIcon,
    items: [
      { id: 31, title: 'Foo', url: '#foo' },
      { id: 32, title: 'Bar', url: '#bar' },
      { id: 33, title: 'Baz', url: '#baz' },
    ],
  },
];

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

Container.displayName = 'div';

class SideNavContent extends React.Component {
  constructor() {
    super();

    this.state = {
      openProfile: false,
    };

    this.handleOpenProfile = this.handleOpenProfile.bind(this);
    this.handleCloseProfile = this.handleCloseProfile.bind(this);
  }

  handleOpenProfile() {
    this.setState({ openProfile: true });
  }

  handleCloseProfile() {
    this.setState({ openProfile: false });
  }

  render() {
    return (
      <div>
        <button
          id="sidenav__profile-button"
          className="sidenav__content-item"
          onClick={this.handleOpenProfile}
          style={{ background: 'transparent', border: 0 }}
        >
          <Avatar
            src="http://i.pravatar.cc/150"
            alt="profil picture"
            small={this.props.sideNavCallapsed}
          />
        </button>
        <SideNavPanel
          open={this.state.openProfile}
          title="Profile"
          onClose={this.handleCloseProfile}
          closeFocusTargetId="sidenav__profile-button"
        >
          <div>
            <Avatar src="http://i.pravatar.cc/150" alt="profil picture" large />
          </div>
        </SideNavPanel>
      </div>
    );
  }
}

SideNavContent.propTypes = {
  sideNavCallapsed: PropTypes.bool.isRequired,
};

class SideNavRouterProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentUrl: props.currentUrl };
  }

  getChildContext() {
    return {
      router: {
        history: {
          push: currentUrl => this.setState({ currentUrl }),
        },
      },
    };
  }

  render() {
    return this.props.children(this.state.currentUrl);
  }
}

SideNavRouterProvider.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

SideNavRouterProvider.childContextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }),
};

storiesOf('SideNav', module)
  .addDecorator(story => <Container>{story()}</Container>)
  .addWithJSX('overview', () => (
    <SideNavRouterProvider currentUrl="#three">
      {currentUrl => (
        <SideNav
          logo={text('logo', 'Brand')}
          logoSmall={text('logoSmall', 'B.')}
          logoUrl="#"
          currentUrl={currentUrl}
          items={items}
          color={select(
            'color',
            [
              'red',
              'orange',
              'yellow',
              'lime',
              'green',
              'pine',
              'teal',
              'blue',
              'indigo',
              'purple',
              'pink',
            ],
            'red'
          )}
          expandButtonA11yLabel="click to expand side navigation"
          collapseButtonA11yLabel="click to collapse side navigation"
          openMenuButtonLabel="Menu"
          closeMenuButtonLabel="Close"
          dark={boolean('dark', false)}
        >
          {({ collapsed }) => <SideNavContent sideNavCallapsed={collapsed} />}
        </SideNav>
      )}
    </SideNavRouterProvider>
  ));

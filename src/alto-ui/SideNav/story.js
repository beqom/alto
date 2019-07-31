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
import CogIcon from '../Icons/Cog';
import ObjectsIcon from '../Icons/Objects';
import UserIcon from '../Icons/User';
import Bell from '../Icons/Bell';
import Avatar from '../Avatar';
import StateProvider from '../StateProvider';

const items = [
  {
    id: 1,
    title: 'Numbers and digits display',
    icon: LightbulbIcon,
    url: '#one',
  },
  {
    id: 2,
    title: 'Fruits',
    icon: BoltIcon,
    url: '#two',
  },
  {
    id: 3,
    title: 'FBB',
    icon: ObjectsIcon,
    url: '#three',
  },
  {
    id: 4,
    title: 'Cars',
    icon: LightbulbIcon,
    url: '#four',
  },
  {
    id: 5,
    title: 'Home',
    icon: BoltIcon,
    url: '#five',
  },
  {
    id: 6,
    title: 'Files',
    icon: ObjectsIcon,
    url: '#six',
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
          <Avatar src="http://i.pravatar.cc/150" alt="profil picture" />
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
    <StateProvider state={{ collapsed: false }}>
      {(state, setState) => (
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
              secondaryItems={[
                {
                  id: 7,
                  title: 'User',
                  icon: UserIcon,
                  url: '#seven',
                },
                {
                  id: 8,
                  title: 'Settings',
                  icon: CogIcon,
                  url: '#eight',
                },
                {
                  id: 9,
                  title: 'Notifications',
                  icon: Bell,
                  // eslint-disable-next-line no-alert
                  onClick: () => alert('On click event'),
                },
              ]}
              expandButtonLabel="click to expand side navigation"
              collapseButtonLabel="click to collapse side navigation"
              openMenuButtonLabel="Menu"
              closeMenuButtonLabel="Close"
              dark={boolean('dark', false)}
              onToggle={() => setState({ collapsed: !state.collapsed })}
              collapsed={state.collapsed}
            >
              {({ collapsed }) => <SideNavContent sideNavCallapsed={collapsed} />}
            </SideNav>
          )}
        </SideNavRouterProvider>
      )}
    </StateProvider>
  ));

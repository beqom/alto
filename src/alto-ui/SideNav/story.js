/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import styled from 'styled-components';

import SideNav from './SideNav';
import SideNavPanel from './SideNavPanel';
import README from './README.md';

import LightbulbIcon from '../Icons/Lightbulb';
import BoltIcon from '../Icons/Bolt';
import ObjectsIcon from '../Icons/Objects';
import Avatar from '../Avatar';

const items = [
  {
    title: 'Numbers',
    icon: LightbulbIcon,
    items: [
      { title: 'One', url: '#one' },
      { title: 'Two', url: '#two' },
      { title: 'Three', url: '#three' },
      { title: 'Foor', url: '#foor' },
      { title: 'Five', url: '#five' },
    ],
  },
  {
    title: 'Fruits',
    icon: BoltIcon,
    items: [
      { title: 'Apple', url: '#apple/foo' },
      { title: 'Banana', url: '#banana' },
      { title: 'Orange', url: '#orange' },
    ],
  },
  {
    title: 'FBB',
    icon: ObjectsIcon,
    items: [
      { title: 'Foo', url: '#foo' },
      { title: 'Bar', url: '#bar' },
      { title: 'Baz', url: '#baz' },
    ],
  },
];

const urls = items
  .map(item => item.items.map(({ url }) => url))
  .reduce((acc, val) => acc.concat(val));

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
      <div style={{ display: 'flex', padding: 10, justifyContent: 'space-around' }}>
        <button
          id="sidenav__profile-button"
          onClick={this.handleOpenProfile}
          style={{ background: 'transparent', border: 0 }}
        >
          <Avatar src="http://i.pravatar.cc/150" alt="profil picture" small={this.props.sideNavCallapsed} />
        </button>
        <SideNavPanel
          open={this.state.openProfile}
          title="Profile"
          onClose={this.handleCloseProfile}
          closeFocusTargetId="sidenav__profile-button"
        >
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Avatar src="http://i.pravatar.cc/150" alt="profil picture" large />
          </div>
        </SideNavPanel>
      </div>
    );
  }
}

SideNavContent.propTypes = {
  sideNavCallapsed: PropTypes.bool.isRequired,
}

storiesOf('SideNav', module)
  .addDecorator(withReadme(README))
  .addDecorator(story => <Container>{story()}</Container>)
  .addWithJSX('overview', () => (
    <SideNav
      logo={text('logo', 'Brand')}
      logoSmall={text('logoSmall', 'B.')}
      logoUrl="#"
      currentUrl={select('currentUrl', ['none'].concat(urls), '#three')}
      items={items}
      expandButtonA11yLabel="click to expand side navigation"
      collapseButtonA11yLabel="click to collapse side navigation"
      openMenuButtonLabel="Menu"
      closeMenuButtonLabel="Close"
    >
      {({ collapsed }) => <SideNavContent sideNavCallapsed={collapsed} />}
    </SideNav>
  ));

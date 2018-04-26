/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import styled from 'styled-components';

import MediaObject from './MediaObject';

const CenteredDiv = styled.div`
  margin: auto;
`;

const DarkWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  ${props =>
    props.dark &&
    `
    background-color: #192328;
  `};
`;

storiesOf('MediaObject', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => {
    const white = boolean('white', false);
    return (
      <DarkWrapper dark={white}>
        <CenteredDiv>
          <MediaObject
            title={text('title', 'Sherry Franklin')}
            subtitle={text('subtitle', 'Head of Group Accounting')}
            src={text('src', 'http://i.pravatar.cc/150?img=49')}
            alt={text('alt', 'picture of Sherry Franklin')}
            large={boolean('large', false)}
            small={boolean('small', false)}
            danger={boolean('danger', false)}
            success={boolean('success', false)}
            avatar={boolean('avatar', true)}
            white={white}
          />
        </CenteredDiv>
      </DarkWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const props = {
      title: text('title', 'Sherry Franklin'),
      subtitle: text('subtitle', 'Head of Group Accounting'),
      src: text('src', 'http://i.pravatar.cc/150?img=49'),
      alt: text('alt', 'picture of Sherry Franklin'),
      avatar: true,
    };
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 300,
          justifyContent: 'space-between',
        }}
      >
        <MediaObject {...props} large />
        <MediaObject {...props} />
        <MediaObject {...props} small />
      </div>
    );
  })
  .addWithJSX('with custom images', () => (
    <div style={{ width: 450 }}>
      <MediaObject
        title={text('title', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
        subtitle={text(
          'subtitle',
          'Nulla malesuada mi sit amet lacinia consequat. Duis egestas volutpat nisi, vitae faucibus orci aliquam sed. Aliquam erat volutpat. Ut fringilla magna velit, pellentesque bibendum quam convallis in.'
        )}
        src={boolean('Image not found ?') ? 'foo' : 'https://picsum.photos/300/200?image=180'}
        imageWidth={number('imageWidth', 100)}
        imageHeight={number('imageHeight', 70)}
        alt="news"
        top={boolean('top', true)}
        wrap={boolean('wrap', true)}
        large={boolean('large', false)}
        small={boolean('small', false)}
        danger={boolean('danger', false)}
        success={boolean('success', false)}
        avatar={boolean('avatar', false)}
      />
    </div>
  ));

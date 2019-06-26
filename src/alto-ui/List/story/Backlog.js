/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';

import List from '../List';
import Lightbulb from '../../Icons/Lightbulb';
import ErrorIcon from '../../Icons/ErrorIcon';
import EditIcon from '../../Icons/Edit';
import AngleArrow from '../../Icons/AngleArrow';
import ArrowUp from '../../Icons/ArrowUp';
import ArrowDown from '../../Icons/ArrowDown';

import { tickets } from './data';

function renderType(type) {
  const getTypeStyle = backgroundColor => ({
    fontSize: '0.7rem',
    display: 'inline-block',
    padding: '3px',
    backgroundColor,
    color: 'white',
    borderRadius: 3,
  });

  switch (type) {
    case 'story':
      return (
        <div style={getTypeStyle('YELLOWGREEN')}>
          <Lightbulb />
        </div>
      );
    case 'bug':
      return (
        <div style={getTypeStyle('CRIMSON')}>
          <ErrorIcon />
        </div>
      );
    default:
      return (
        <div style={getTypeStyle('MEDIUMORCHID')}>
          <EditIcon />
        </div>
      );
  }
}

function renderPriority(priority) {
  switch (priority) {
    case 1:
      return <AngleArrow color="CRIMSON" weight="2" />;
    case 2:
      return <ArrowUp color="DARKORANGE" weight="2" />;
    case 3:
      return <ArrowDown color="MEDIUMSEAGREEN" weight="2" />;
    default:
      return <AngleArrow color="DEEPSKYBLUE" weight="2" style={{ transform: 'rotate(180deg)' }} />;
  }
}

function Backlog() {
  const [items, setItems] = useState(tickets);

  return (
    <List
      id="backlog"
      small
      sortable
      active={({ selected }) => selected}
      items={items}
      onChange={xs => setItems(xs)}
      fields={[
        {
          key: 'selected',
          type: 'checkbox',
        },
        {
          key: 'type',
          render: renderType,
        },
        {
          key: 'title',
          primary: true,
        },
        {
          key: 'labels',
          type: 'badges',
          props: label => ({
            blue: label === 'Frontend',
            red: label === 'Backend',
            green: label === 'QA',
            pink: label === 'Design',
          }),
        },
        {
          key: 'assignee',
          type: 'avatar',
          defaultValue: {},
          props: ({ img, name }) => ({ src: img, tooltip: name }),
        },
        {
          key: 'points',
          type: 'badge',
          defaultValue: '-',
        },
        {
          key: 'priority',
          render: renderPriority,
        },
      ]}
    />
  );
}

export default Backlog;

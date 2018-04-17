/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, color, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import Add from './Add';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import Bars from './Bars';
import Bell from './Bell';
import Bolt from './Bolt';
import Building from './Building';
import ChevronDown from './ChevronDown';
import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronUp from './ChevronUp';
import Close from './Close';
import Cog from './Cog';
import Config from './Config';
import Collapse from './Collapse';
import Copy from './Copy';
import Delete from './Delete';
import Edit from './Edit';
import EllipsisHorizontal from './EllipsisHorizontal';
import EllipsisVertical from './EllipsisVertical';
import Expand from './Expand';
import Eye from './Eye';
import File from './File';
import FileSettings from './FileSettings';
import Filter from './Filter';
import Folder from './Folder';
import FolderOpen from './FolderOpen';
import Globe from './Globe';
import Image from './Image';
import Lightbulb from './Lightbulb';
import List from './List';
import Minus from './Minus';
import More from './More';
import Note from './Note';
import MinusCircle from './MinusCircle';
import Pencil from './Pencil';
import PlusCircle from './PlusCircle';
import Plus from './Plus';
import Objects from './Objects';
import Options from './Options';
import Organization from './Organization';
import Remove from './Remove';
import Search from './Search';
import Times from './Times';
import Trash from './Trash';
import User from './User';
import ViewCards from './ViewCards';
import ViewList from './ViewList';
import World from './World';

const icons = Object.entries({
  Add,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  Bars,
  Bell,
  Bolt,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ChevronRight,
  Close,
  Cog,
  Collapse,
  Copy,
  Config,
  Delete,
  Edit,
  EllipsisHorizontal,
  EllipsisVertical,
  Expand,
  Eye,
  File,
  FileSettings,
  Filter,
  Folder,
  FolderOpen,
  Globe,
  Image,
  Lightbulb,
  List,
  Minus,
  MinusCircle,
  More,
  Note,
  Pencil,
  Plus,
  PlusCircle,
  Objects,
  Options,
  Organization,
  Remove,
  Search,
  Times,
  Trash,
  User,
  ViewCards,
  ViewList,
  World,
}).map(([name, Icon]) => ({ name, Icon }));

storiesOf('Icons', module).add('all', () => {
  const outlineProps = boolean('outline', false) ? { outline: true } : {};
  const size = `${number('size', 30, { range: true, step: 1, min: 5, max: 600 })}px`;
  const col = color('color', '#333C48');
  const iconsElts = icons.map(({ name, Icon }) => (
    <div
      key={name}
      style={{
        textAlign: 'center',
        display: 'flex',
        padding: 10,
        width: '33%',
        alignItems: 'center',
      }}
    >
      <div style={{ padding: 10 }}>
        <Icon
          {...outlineProps}
          size={size}
          color={col}
          onClick={boolean('onClick', false) ? () => {} : undefined}
        />
      </div>
      <div style={{ marginLeft: 10 }}>{name}</div>
    </div>
  ));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: 20,
      }}
    >
      {iconsElts}
    </div>
  );
});

icons.forEach(({ name, Icon }) => {
  storiesOf('Icons', module)
    .addDecorator(centered)
    .add(name, () => (
      <Icon
        outline={boolean('outline', false)}
        size={`${number('size', 50, { range: true, step: 1, min: 5, max: 600 })}px`}
        color={color('color', '#333C48')}
        onClick={boolean('onClick', false) ? () => {} : undefined}
      />
    ));
});

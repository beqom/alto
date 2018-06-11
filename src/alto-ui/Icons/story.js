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
import Calculator from './Calculator';
import Check from './Check';
import CheckCircle from './CheckCircle';
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
import Download from './Download';
import Edit from './Edit';
import EllipsisHorizontal from './EllipsisHorizontal';
import EllipsisVertical from './EllipsisVertical';
import Envelope from './Envelope';
import ErrorIcon from './ErrorIcon';
import ExclamationCircle from './ExclamationCircle';
import ExclamationTriangle from './ExclamationTriangle';
import Expand from './Expand';
import ExportFile from './ExportFile';
import Eye from './Eye';
import File from './File';
import FileGroup from './FileGroup';
import FileSettings from './FileSettings';
import Filter from './Filter';
import Folder from './Folder';
import FolderOpen from './FolderOpen';
import Globe from './Globe';
import Help from './Help';
import HelpInfo from './HelpInfo';
import Home from './Home';
import Image from './Image';
import ImportFile from './ImportFile';
import InfoCircle from './InfoCircle';
import Lightbulb from './Lightbulb';
import List from './List';
import Menu from './Menu';
import Minus from './Minus';
import More from './More';
import Note from './Note';
import MinusCircle from './MinusCircle';
import Objects from './Objects';
import Options from './Options';
import Organization from './Organization';
import Pencil from './Pencil';
import Plus from './Plus';
import PlusCircle from './PlusCircle';
import Populations from './Populations';
import Remove from './Remove';
import Search from './Search';
import Tasks from './Tasks';
import Times from './Times';
import Trash from './Trash';
import Unknown from './Unknown';
import Upload from './Upload';
import User from './User';
import ViewCards from './ViewCards';
import ViewColumns from './ViewColumns';
import ViewList from './ViewList';
import World from './World';
import Tool from './Tool';

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
  Calculator,
  Check,
  CheckCircle,
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
  Download,
  Edit,
  EllipsisHorizontal,
  EllipsisVertical,
  Envelope,
  ErrorIcon,
  ExclamationCircle,
  ExclamationTriangle,
  Expand,
  ExportFile,
  Eye,
  File,
  FileGroup,
  FileSettings,
  Filter,
  Folder,
  FolderOpen,
  Globe,
  Help,
  HelpInfo,
  Home,
  Image,
  ImportFile,
  InfoCircle,
  Lightbulb,
  List,
  Menu,
  Minus,
  MinusCircle,
  More,
  Note,
  Objects,
  Options,
  Organization,
  Pencil,
  Plus,
  PlusCircle,
  Populations,
  Remove,
  Search,
  Tasks,
  Times,
  Trash,
  Unknown,
  Upload,
  User,
  ViewCards,
  ViewColumns,
  ViewList,
  World,
  Tool,
}).map(([name, Icon]) => ({ name, Icon }));

storiesOf('Icons', module).add('all', () => {
  const outlineProps = boolean('outline', false) ? { outline: true } : {};
  const badged = boolean('badged', false);
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
          badged={badged}
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
        badged={boolean('badged', false)}
        size={`${number('size', 50, { range: true, step: 1, min: 5, max: 600 })}px`}
        color={color('color', '#333C48')}
        onClick={boolean('onClick', false) ? () => {} : undefined}
      />
    ));
});

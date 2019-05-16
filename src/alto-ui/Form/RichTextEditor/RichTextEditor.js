import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import Editor, { Quill } from 'react-quill';
import MagicUrl from 'quill-magic-url';
import 'quill-mention';

import { bemClass } from '../../helpers/bem';
import context from './context';
import HTMLBlock from '../../HTMLBlock/HTMLBlock';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';
import FormElement from '../FormElement';

import './RichTextEditor.scss';

Quill.register('modules/magicUrl', MagicUrl);

const INLINE_FORMAT = { bold: true, italic: true, strike: true, link: true };

const cleanEmptyNodes = node => {
  if (node && !node.innerText.trim()) {
    if (node.parentElement) {
      node.parentElement.removeChild(node);
      cleanEmptyNodes(node.parentElement);
    } else {
      // eslint-disable-next-line no-param-reassign
      node.innerHTML = '';
    }
  }
};

const useUpdateMentions = (time = 200) =>
  useDebouncedCallback((instance, onChange) => {
    if (instance && instance.state.value) {
      const originalValue = instance.state.value;
      const container = document.createElement('div');
      container.innerHTML = originalValue;
      [...container.querySelectorAll('.mention')].forEach(elt => {
        const mention = (instance.mentions || []).find(m => m.id === elt.dataset.id);
        if (mention) {
          // eslint-disable-next-line no-param-reassign
          elt.dataset.value = mention.value;
        } else {
          const parent = elt.parentElement;
          parent.removeChild(elt);
          cleanEmptyNodes(parent);
        }
      });
      const newValue = container.innerHTML;
      if (newValue !== originalValue) onChange(newValue);
    }
  }, time);

const getToolbar = formats =>
  [
    ['bold', 'italic', 'strike'].filter(x => formats[x]),
    formats.link ? ['link'] : [],
    formats.header ? [{ header: 1 }, { header: 2 }] : [],
    formats.list ? [{ list: 'ordered' }, { list: 'bullet' }] : [],
    ['clean'],
  ].filter(xs => xs.length);

const getFormats = ({ inline, header, list, full, link, strike, italic, bold, mentions }) => ({
  ...(mentions === undefined ? {} : { mention: true }),
  ...(link === undefined ? {} : { link }),
  ...(strike === undefined ? {} : { strike }),
  ...(italic === undefined ? {} : { italic }),
  ...(bold === undefined ? {} : { bold }),
  ...(list === undefined ? {} : { list }),
  ...(header === undefined ? {} : { header }),
  ...(inline ? INLINE_FORMAT : {}),
  ...(full ? { ...INLINE_FORMAT, header: true, list: true } : {}),
});

const getModules = (instance, { toolbar, autoLink }) => ({
  toolbar,
  magicUrl: autoLink,
  clipboard: {
    matchVisual: false,
  },
  mention: (instance.mentions || []).length
    ? {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ['@'],
        mentionContainerClass: 'RichTextEditor__mentions-dropdown',
        mentionListClass: 'RichTextEditor__mentions-list',
        listItemClass: 'RichTextEditor__mentions-item',
        showDenotationChar: false,
        isolateCharacter: true,
        source(searchTerm, renderList) {
          if (searchTerm.length === 0) {
            renderList(instance.mentions, searchTerm);
          } else {
            const matches = instance.mentions.filter(m =>
              m.value.toLowerCase().includes(searchTerm.toLowerCase())
            );
            renderList(matches, searchTerm);
          }
        },
      }
    : null,
});

const RichTextEditor = React.forwardRef((props, ref) => {
  const { props: sharedProps = {} } = useContext(context) || {};

  const {
    className,
    value,
    onChange,
    hasToolbar,
    autoLink,
    inline,
    full,
    header,
    list,
    bold,
    strike,
    italic,
    link,
    toolbar,
    mentions,
    oneline,
    children,
    readonly,
    disabled,
    label,
    onBlur,
    ...editorProps
  } = { ...sharedProps, ...props };

  const formats = getFormats({
    inline,
    full,
    header,
    list,
    bold,
    strike,
    italic,
    link,
    mentions,
  });

  const formatList = Object.entries(formats)
    .filter(([, enabled]) => enabled)
    .map(([format]) => format);

  const instance = useRef({}).current;
  instance.mentions = mentions;

  const modules = useMemo(
    () =>
      getModules(instance, {
        formats: formatList,
        toolbar: formatList.length ? props.toolbar || getToolbar(formats) : null,
        autoLink,
      }),
    [inline, full, header, list, bold, strike, italic, link, !!(mentions || []).length]
  );

  const mainRef = useRef();

  const [state, setState] = useState({ value });

  instance.state = state;

  useEffect(() => {
    if (state.value !== value) setState({ value });
  }, [value]);

  const updateMentions = useUpdateMentions();
  useEffect(() => updateMentions(instance, onChange));

  if (readonly || disabled) {
    return (
      <div
        ref={mainRef}
        className={bemClass(
          'RichTextEditorReandOnly',
          {
            snow: hasToolbar,
            bubble: !hasToolbar,
            readonly,
            disabled,
          },
          className
        )}
      >
        <HTMLBlock html={value} oneline={oneline} />
        {children}
      </div>
    );
  }

  const editorElt = (
    <div
      ref={mainRef}
      className={bemClass(
        'RichTextEditor',
        {
          snow: hasToolbar,
          bubble: !hasToolbar,
          oneline,
        },
        className
      )}
    >
      <Editor
        ref={ref}
        value={state.rawValue || state.value || ''}
        onChange={(rawValue, _, __, editor) => {
          const text = editor.getText();
          const content = oneline ? rawValue.replace(/<p><br><\/p>/g, '') : rawValue;
          const result = text && text !== '\n' ? content : '';

          if (result === value) return;

          setState({
            rawValue,
            value: result,
          });

          onChange(result);
        }}
        theme={(hasToolbar && 'snow') || 'bubble'}
        {...editorProps}
        formats={formatList.length ? [...formatList, 'indent'] : []}
        modules={modules}
        onBlur={(...args) => {
          if (typeof onBlur === 'function') onBlur(...args);
          setState({ value: state.value });
        }}
      />
      {children}
    </div>
  );

  if (!label) return editorElt;
  return (
    <FormElement label={label} {...props} className="">
      {editorElt}
    </FormElement>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

RichTextEditor.defaultProps = {
  autoLink: true,
};

RichTextEditor.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hasToolbar: PropTypes.bool,
  autoLink: PropTypes.bool,
  inline: PropTypes.bool,
  full: PropTypes.bool,
  header: PropTypes.bool,
  list: PropTypes.bool,
  bold: PropTypes.bool,
  strike: PropTypes.bool,
  italic: PropTypes.bool,
  link: PropTypes.bool,
  toolbar: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
  ),
  oneline: PropTypes.bool,
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  mentions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.any,
};

export default RichTextEditor;

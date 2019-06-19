import React, { useEffect, useRef, useMemo, useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';

import context from './context';
import { bemClass } from '../helpers/bem';
import './HTMLBlock.scss';

const renderMentions = (ref, renderMention) => {
  if (ref && ref.current) {
    [...ref.current.querySelectorAll('.mention')].forEach((elt, i) => {
      ReactDOM.render(renderMention(elt.dataset, elt, i), elt);
    });
  }
};

const cleanHtml = html => {
  const container = document.createElement('div');
  container.innerHTML = html;
  // clean mentions, they will be filled with renderMention()
  [...container.querySelectorAll('.mention')].forEach(elt => {
    // eslint-disable-next-line no-param-reassign
    elt.innerHTML = '';
  });
  // add "http://" to link
  [...container.querySelectorAll('a')].forEach(elt => {
    // eslint-disable-next-line no-param-reassign
    elt.href = /^http|\//.test(elt.getAttribute('href'))
      ? elt.getAttribute('href')
      : `http://${elt.getAttribute('href')}`;

    // eslint-disable-next-line no-param-reassign
    elt.target = '_blank';
  });
  return sanitize(container.innerHTML, { ADD_ATTR: ['target'] });
};

const defaultProps = {
  tag: 'div',
  // eslint-disable-next-line react/prop-types
  renderMention: ({ value }) => <span>{value}</span>,
};

const HTMLBlock = React.forwardRef((props, givenRef) => {
  const defaultRef = useRef();
  const ref = givenRef || defaultRef;

  const sharedProps = useContext(context);

  const { tag: Tag, html, className, renderMention, oneline, ...otherProps } = {
    ...defaultProps,
    ...sharedProps,
    ...props,
  };

  const cleanedHtml = useMemo(() => cleanHtml(html), [html]);

  useEffect(() => {
    // ensure DOM has been updated, push update mention to the end of the stack
    const timeout = setTimeout(() => renderMentions(ref, renderMention), 0);
    return () => clearTimeout(timeout);
  });

  return (
    <Tag
      ref={ref}
      {...otherProps}
      className={bemClass('HTMLBlock', { oneline }, 'ql-editor', className)}
      dangerouslySetInnerHTML={{
        __html: cleanedHtml,
      }}
    />
  );
});

HTMLBlock.displayName = 'HTMLBlock';

HTMLBlock.propTypes = {
  tag: PropTypes.string,
  html: PropTypes.string,
  className: PropTypes.string,
  renderMention: PropTypes.func,
  oneline: PropTypes.bool,
};

export default HTMLBlock;

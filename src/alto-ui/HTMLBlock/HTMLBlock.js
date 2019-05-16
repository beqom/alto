import React, { useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';

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
    elt.href = /^http/.test(elt.href) ? elt.href : `http://${elt.href}`;
  });
  return sanitize(container.innerHTML);
};

const HTMLBlock = React.forwardRef(
  ({ tag: Tag, html, className, renderMention, oneline, ...props }, givenRef) => {
    const defaultRef = useRef();
    const ref = givenRef || defaultRef;

    const cleanedHtml = useMemo(() => cleanHtml(html), [html]);

    useEffect(() => renderMentions(ref, renderMention));

    return (
      <Tag
        ref={ref}
        {...props}
        className={bemClass('HTMLBlock', { oneline }, 'ql-editor', className)}
        dangerouslySetInnerHTML={{
          __html: cleanedHtml,
        }}
      />
    );
  }
);

HTMLBlock.displayName = 'HTMLBlock';

HTMLBlock.defaultProps = {
  tag: 'div',
  // eslint-disable-next-line react/prop-types
  renderMention: ({ value }) => <span>{value}</span>,
};

HTMLBlock.propTypes = {
  tag: PropTypes.string,
  html: PropTypes.string,
  className: PropTypes.string,
  renderMention: PropTypes.func,
  oneline: PropTypes.bool,
};

export default HTMLBlock;

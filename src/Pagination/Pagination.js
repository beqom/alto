import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import styled from 'styled-components';

import { resetButton } from '../Button';
import ChevronLeftIcon from '../Icons/ChervronLeft';
import ChevronRightIcon from '../Icons/ChervronRight';
import { getColor, getTheme, fontSize } from '../helpers/theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageButton = styled.button`
  ${resetButton};
  ${fontSize('small')};
  cursor: pointer;
  font-weight: 600;
  padding: 0 10px;
  margin: 0 2px;
  line-height: 26px;
  text-align: center;
  min-width: 26px;
  color: ${getColor('coolGrey.50')};
  border-radius: 13px;

  :hover {
    color: ${getColor('coolGrey.70')};
    background-color: ${getColor('coolGrey.10')};
  }

  :disabled {
    opacity: 0.5;
  }
`;

export const PageButtonCurrent = PageButton.withComponent('div').extend`
  &,
  :hover {
    background-color: ${getColor('primary')};
    color: white;
  }
`;

export const PageButtonArrow = PageButton.extend`
  padding: 0.2em 0;
  width: 1.6em;
  text-align: center;
`;

export const Ellipsis = styled.span`
  margin: 0 2px;
  color: ${getColor('coolGrey.40')};
  :before {
    content: '...';
  }
`;

const renderPageButton = (pages, onClick, current) =>
  pages.map(page => {
    if (current === page) {
      return (
        <PageButtonCurrent key={page} aria-label={`Current Page, Page ${page}`} aria-current>
          {page}
        </PageButtonCurrent>
      );
    }

    return (
      <PageButton key={page} onClick={() => onClick(page)} aria-label={`Goto Page ${page}`}>
        {page}
      </PageButton>
    );
  });

const Pagination = ({ className, max, current, onClick }) => {
  const maxValue = Math.max(0, max);
  const currentValue = Math.min(max, Math.max(1, current));
  if (maxValue === 0) return null;

  const pages = range(1, max + 1);

  const firstPage = pages.slice(0, 1);
  const beforePages = pages.slice(1, Math.max(1, currentValue - 2));
  const currentPages = pages.slice(
    Math.max(1, currentValue - 2),
    Math.min(maxValue - 1, currentValue + 1)
  );
  const afterPages = pages.slice(Math.min(maxValue - 1, currentValue + 1), maxValue - 1);
  const lastPage = pages.slice(1).slice(-1);

  return (
    <Container className={className}>

      {renderPageButton(firstPage, onClick, currentValue)}
      {!!beforePages.length && <Ellipsis />}
      {renderPageButton(currentPages, onClick, currentValue)}
      {!!afterPages.length && <Ellipsis />}
      {renderPageButton(lastPage, onClick, currentValue)}

      <PageButtonArrow onClick={() => onClick(currentValue - 1)} disabled={currentValue === 1}>
        <ChevronLeftIcon />
      </PageButtonArrow>
      <PageButtonArrow
        onClick={() => onClick(currentValue + 1)}
        disabled={currentValue === maxValue}
      >
        <ChevronRightIcon />
      </PageButtonArrow>
    </Container>
  );
};

Pagination.displayName = 'Pagination';

Pagination.defaultProps = {
  className: '',
};

Pagination.propTypes = {
  /** additonal class to add to the wrapper component */
  className: PropTypes.string,
  /** current page number (between 1 -> max) */
  current: PropTypes.number.isRequired,
  /** max number of pages */
  max: PropTypes.number.isRequired,
  /** function that will be called each time the page change, first argument is the page number */
  onClick: PropTypes.func.isRequired,
};

export default Pagination;

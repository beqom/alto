import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import ChevronLeftIcon from '../Icons/ChervronLeft';
import ChevronRightIcon from '../Icons/ChervronRight';

import './Pagination.scss';

const renderPageButton = (pages, onClick, current) =>
  pages.map(page => {
    if (current === page) {
      return (
        <div key={page} className="Pagination__page-button Pagination__page-button--current">
          {page}
        </div>
      );
    }

    return(
      <button key={page} className="Pagination__page-button" onClick={() => onClick(page)}>
        {page}
      </button>
    );
  });

const renderPageDots = pages =>
  pages.length ? <span className="Pagination__ellipsis">...</span> : null;

const Pagination = ({ className, max, current, onClick }) => {
  const maxValue = Math.max(0, max);
  const currentValue = Math.min(max, Math.max(1, current));
  const pages = range(1, max + 1);

  const firstPage = pages.slice(0, 1);
  const beforePages = pages.slice(1, Math.max(1, currentValue - 3));
  const currentPages = pages.slice(
    Math.max(1, currentValue - 3),
    Math.min(maxValue - 1, currentValue + 2)
  );
  const afterPages = pages.slice(Math.min(maxValue - 1, currentValue + 2), maxValue - 1);
  const lastPage = pages.slice(1).slice(-1);

  return (
    <div className={classnames('Pagination', className)}>
      <button
        className="Pagination__page-button Pagination__page-button--arrow"
        onClick={() => onClick(currentValue - 1)}
        disabled={currentValue === 1}
      >
        <ChevronLeftIcon />
      </button>
      {renderPageButton(firstPage, onClick, currentValue)}
      {renderPageDots(beforePages)}
      {renderPageButton(currentPages, onClick, currentValue)}
      {renderPageDots(afterPages)}
      {renderPageButton(lastPage, onClick, currentValue)}
      <button
        className="Pagination__page-button Pagination__page-button--arrow"
        onClick={() => onClick(currentValue + 1)}
        disabled={currentValue === maxValue}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

Pagination.displayName = 'Pagination';

Pagination.defaultProps = {};

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

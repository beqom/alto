import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash.range';

import { bemClass } from '../helpers/bem';
import ChevronLeftIcon from '../Icons/ChevronLeft';
import ChevronRightIcon from '../Icons/ChevronRight';

import './Pagination.scss';

const renderPageButton = (
  pages,
  onClick,
  current,
  { pageLabel, currentPageLabel, goToPageLabel }
) =>
  pages.map(page => {
    if (current === page) {
      return (
        <div
          key={page}
          className={bemClass('Pagination__button', { current: true })}
          aria-label={`${currentPageLabel}, ${pageLabel} ${page}`}
          aria-current
        >
          {page}
        </div>
      );
    }

    return (
      <button
        key={page}
        className="Pagination__button"
        onClick={() => onClick(page)}
        aria-label={`${goToPageLabel} ${page}`}
      >
        {page}
      </button>
    );
  });

const Pagination = ({ className, max, current, onClick, labels }) => {
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

  const paginationLabels = {
    pageLabel: 'page',
    currentPageLabel: 'Current page',
    goToPageLabel: 'Go to page',
    ...labels,
  };
  return (
    <div className={bemClass('Pagination', {}, className)}>
      {renderPageButton(firstPage, onClick, currentValue, paginationLabels)}
      {!!beforePages.length && <span className="Pagination__ellipsis" />}
      {renderPageButton(currentPages, onClick, currentValue, paginationLabels)}
      {!!afterPages.length && <span className="Pagination__ellipsis" />}
      {renderPageButton(lastPage, onClick, currentValue, paginationLabels)}

      <button
        className={bemClass('Pagination__button', { arrow: true })}
        onClick={() => onClick(currentValue - 1)}
        disabled={currentValue === 1}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className={bemClass('Pagination__button', { arrow: true })}
        onClick={() => onClick(currentValue + 1)}
        disabled={currentValue === maxValue}
      >
        <ChevronRightIcon />
      </button>
    </div>
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
  labels: PropTypes.shape({
    pageLabel: PropTypes.string.isRequired,
    currentPageLabel: PropTypes.string.isRequired,
    goToPageLabel: PropTypes.string.isRequired,
  }),
};

export default Pagination;

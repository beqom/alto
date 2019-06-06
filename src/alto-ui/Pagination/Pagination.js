import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import ChevronLeftIcon from '../Icons/ChevronLeft';
import ChevronRightIcon from '../Icons/ChevronRight';
import { format } from '../helpers/number';

import './Pagination.scss';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_LABELS = {
  pageLabel: 'page',
  currentPageLabel: 'Current page',
  goToPageLabel: 'Go to page',
  ofTotal: 'of',
};

const Pagination = ({ id, className, onChange, pageSize, ...props }) => {
  const totalRecords = Math.max(0, props.totalRecords);
  if (totalRecords === 0) return null;
  const numberOfPages = Math.ceil(totalRecords / pageSize);
  const currentPage = Math.min(numberOfPages, Math.max(1, props.currentPage));
  const firstRecordIndex = (currentPage - 1) * pageSize + 1;
  const lastRecordIndex = Math.min(totalRecords, currentPage * pageSize);
  const labels = {
    ...DEFAULT_LABELS,
    ...props.labels,
  };

  return (
    <div id={id} className={bemClass('Pagination', {}, className)}>
      <ChevronLeftIcon
        id={`${id}__arrow--prev`}
        onClick={() => onChange(currentPage - 1)}
        className="Pagination__arrow"
        disabled={currentPage === 1}
      />
      <span className="Pagination__range-items">{`${firstRecordIndex}-${lastRecordIndex}`}</span>
      <span className="Pagination__range-total">{`${labels.ofTotal} ${format(totalRecords)}`}</span>
      <ChevronRightIcon
        id={`${id}__arrow--next`}
        className="Pagination__arrow"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === numberOfPages}
      />
    </div>
  );
};

Pagination.displayName = 'Pagination';

Pagination.defaultProps = {
  className: '',
  pageSize: DEFAULT_PAGE_SIZE,
};

Pagination.propTypes = {
  id: PropTypes.string.isRequired,
  /** additonal class to add to the wrapper component */
  className: PropTypes.string,
  /** current page number (between 1 -> max) */
  currentPage: PropTypes.number.isRequired,
  /** total number of pages */
  totalRecords: PropTypes.number.isRequired,
  /** number of elements per page */
  pageSize: PropTypes.number,

  /** function that will be called each time the page change, first argument is the page number */
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    pageLabel: PropTypes.string.isRequired,
    currentPageLabel: PropTypes.string.isRequired,
    goToPageLabel: PropTypes.string.isRequired,
    ofTotal: PropTypes.string.isRequired,
  }),
};

export default Pagination;

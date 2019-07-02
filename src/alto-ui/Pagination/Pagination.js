import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import ChevronLeftIcon from '../Icons/ChevronLeft';
import ChevronRightIcon from '../Icons/ChevronRight';
import { format } from '../helpers/number';
import Dropdown from '../Dropdown';

import './Pagination.scss';
import Button from '../Button';
import FormRow from '../Form/FormRow';
import InputNumber from '../Form/InputNumber';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_LABELS = {
  elementsPerPage: 'Elements per page',
  pageLabel: 'page',
  currentPageLabel: 'Current page',
  goToPageLabel: 'Go to page',
  ofTotal: 'of',
  save: 'Save',
  cancel: 'Cancel',
};

const Pagination = ({ id, className, onChange, pageSize, ...props }) => {
  const totalRecords = Math.max(0, props.totalRecords);
  const numberOfPages = Math.ceil(totalRecords / pageSize);
  const currentPage = Math.min(numberOfPages, Math.max(1, props.currentPage));

  const [optionsPageSize, setOptionPageSize] = useState(pageSize);
  const [optionsTotalPages, setOptionsTotalPages] = useState(numberOfPages);
  const [optionsGoToPage, setOptionsGoToPage] = useState(currentPage);

  useEffect(() => {
    setOptionPageSize(pageSize);
    setOptionsTotalPages(numberOfPages);
  }, [pageSize]);

  useEffect(() => {
    setOptionsTotalPages(numberOfPages);
    setOptionsGoToPage(currentPage);
  }, [props.totalRecords]);

  useEffect(() => {
    setOptionsGoToPage(currentPage);
  }, [props.currentPage]);

  const setPaginationOptions = (newPageSize, newGoToPage) => {
    setOptionPageSize(newPageSize);
    setOptionsTotalPages(Math.ceil(totalRecords / newPageSize));
    setOptionsGoToPage(Math.min(Math.ceil(totalRecords / newPageSize), newGoToPage));
  };

  if (totalRecords === 0) return null;

  const firstRecordIndex = (currentPage - 1) * pageSize + 1;
  const lastRecordIndex = Math.min(totalRecords, currentPage * pageSize);

  const labels = {
    ...DEFAULT_LABELS,
    ...props.labels,
  };

  const renderDropdownTrigger = (toggle, active, ref) => (
    <Button ref={ref} onClick={toggle} outline flat className="Pagination__range">
      <span className="Pagination__range-items">{`${firstRecordIndex}-${lastRecordIndex}`}</span>
      <span className="Pagination__range-total">{`${labels.ofTotal} ${format(totalRecords)}`}</span>
    </Button>
  );

  const handleSave = closeDropdown => {
    onChange(optionsGoToPage, optionsPageSize);
    closeDropdown();
  };

  const handleCancel = closeDropdown => {
    setOptionsGoToPage(props.currentPage);
    setOptionPageSize(pageSize);
    setOptionsTotalPages(numberOfPages);
    if (typeof closeDropdown === 'function') closeDropdown();
  };

  const validate = () => {
    if (!optionsPageSize) {
      setPaginationOptions(pageSize, optionsGoToPage);
    }

    if (optionsGoToPage === 0) {
      setPaginationOptions(optionsPageSize, props.currentPage);
    }
  };

  const renderDropdownContent = closeDropdown => (
    <div className="Pagination__options">
      <FormRow className="Pagination__options-row">
        {labels.elementsPerPage}
        <InputNumber
          value={optionsPageSize}
          onChange={(e, value) => setPaginationOptions(value, optionsGoToPage)}
          onBlur={validate}
          min={1}
          max={totalRecords}
          className="Pagination__options-page-size"
          small
        />
      </FormRow>
      <FormRow className="Pagination__options-row">
        {labels.goToPageLabel}
        <InputNumber
          small
          value={optionsGoToPage}
          className="Pagination__options-goto-page"
          min={1}
          max={optionsTotalPages}
          onBlur={validate}
          onChange={(e, value) => setPaginationOptions(optionsPageSize, value)}
        />
        {`${labels.ofTotal} ${format(optionsTotalPages)}`}
      </FormRow>
      <FormRow className="Pagination__options-row--footer">
        <Button small white id={`${id}__close-options`} onClick={() => handleCancel(closeDropdown)}>
          {labels.cancel}
        </Button>
        <Button
          small
          id={`${id}__save-options`}
          onClick={() => handleSave(closeDropdown)}
          disabled={!optionsPageSize}
        >
          {labels.save}
        </Button>
      </FormRow>
    </div>
  );

  return (
    <div id={id} className={bemClass('Pagination', {}, className)}>
      <ChevronLeftIcon
        id={`${id}__arrow--prev`}
        onClick={() => onChange(currentPage - 1, pageSize)}
        className="Pagination__arrow"
        disabled={currentPage === 1}
      />
      <Dropdown
        id={`${id}__dropdown`}
        renderTrigger={renderDropdownTrigger}
        center="true"
        closeFocusTargetId={`${id}__close-options`}
        openFocusTargetId={id}
      >
        {(_, closeDropdown) => renderDropdownContent(closeDropdown)}
      </Dropdown>

      <ChevronRightIcon
        id={`${id}__arrow--next`}
        className="Pagination__arrow"
        onClick={() => onChange(currentPage + 1, pageSize)}
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

  /** Function that will be called each time the page change, first argument is the page number
   * @param {number} currentPage
   * @param {number} pageSize
   */
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    pageLabel: PropTypes.string.isRequired,
    currentPageLabel: PropTypes.string.isRequired,
    goToPageLabel: PropTypes.string.isRequired,
    ofTotal: PropTypes.string.isRequired,
  }),
};

export default Pagination;

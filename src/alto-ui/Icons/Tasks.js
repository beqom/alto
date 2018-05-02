import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const TasksOutline = props => (
  <g>
    <path
      {...props}
      d="M29.29,34H6.71A1.7,1.7,0,0,1,5,32.31V6.69A1.75,1.75,0,0,1,7,5H9V7H7V32H29V7H27V5h2.25A1.7,1.7,0,0,1,31,6.69V32.31A1.7,1.7,0,0,1,29.29,34Z"
    />
    <path
      {...props}
      d="M16.66,25.76,11.3,20.4A1,1,0,0,1,12.72,19l3.94,3.94,8.64-8.64a1,1,0,0,1,1.41,1.41Z"
    />
    <path
      {...props}
      d="M26,11H10V7.33A2.34,2.34,0,0,1,12.33,5h1.79a4,4,0,0,1,7.75,0h1.79A2.34,2.34,0,0,1,26,7.33ZM12,9H24V7.33A.33.33,0,0,0,23.67,7H20V6a2,2,0,0,0-4,0V7H12.33a.33.33,0,0,0-.33.33Z"
    />
  </g>
);

const TasksSolid = props => (
  <g>
    <path
      {...props}
      d="M29.29,4.95h-7.2a4.31,4.31,0,0,0-8.17,0H7A1.75,1.75,0,0,0,5,6.64V32.26a1.7,1.7,0,0,0,1.71,1.69H29.29A1.7,1.7,0,0,0,31,32.26V6.64A1.7,1.7,0,0,0,29.29,4.95Zm-18,3a1,1,0,0,1,1-1h3.44V6.32a2.31,2.31,0,0,1,4.63,0V7h3.44a1,1,0,0,1,1,1V9.8H11.25Zm14.52,9.23-9.12,9.12-5.24-5.24a1.4,1.4,0,0,1,2-2l3.26,3.26,7.14-7.14a1.4,1.4,0,1,1,2,2Z"
    />
  </g>
);

const Tasks = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <TasksOutline {...ownProps} />
      : ownProps => <TasksSolid {...ownProps} />}
  </Icon>
);

Tasks.displayName = 'Tasks';

Tasks.defaultProps = {
  outline: false,
};

Tasks.propTypes = {
  outline: PropTypes.bool,
};

export default Tasks;

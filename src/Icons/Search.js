import React from 'react';
import Icon from './Icon';

const Search = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M16.33,5.05A10.95,10.95,0,1,1,5.39,16,11,11,0,0,1,16.33,5.05m0-2.05a13,13,0,1,0,13,13,13,13,0,0,0-13-13Z"
        />
        <path {...ownProps} d="M35,33.29l-7.37-7.42-1.42,1.41,7.37,7.42A1,1,0,1,0,35,33.29Z" />
      </g>
    )}
  </Icon>
);

Search.displayName = 'Search';

export default Search;

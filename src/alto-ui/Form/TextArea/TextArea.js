import React from 'react';
import TextField from '../TextField';

const TextArea = props => (
  <TextField {...props} area />
);

TextArea.displayName = 'TextArea';

export default TextArea;

import React from 'react';

import { TextFieldTag } from '../TextField';
import FormElement from '../FormElement';


export const TextAreaTag = TextFieldTag.withComponent('textarea').extend`
  height: 8em;
`;

TextAreaTag.displayName = 'TextAreaTag';

const TextArea = props => (
  <FormElement {...props}>
    <TextAreaTag {...props} />
  </FormElement>
);

TextArea.displayName = 'TextArea';


export default TextArea;

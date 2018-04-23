import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import {Image} from './Image';


it('Image gets rendered with right attributes', () => {

  const image = renderer.create(<Image/>);
  expect(image).toMatchSnapshot();

});
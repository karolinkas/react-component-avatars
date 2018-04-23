import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import {AvatarPicker} from './AvatarPicker';


it('AvatarPicker gets rendered with as many avatars as you pass in', () => {
  const exampleData =  {
    imageData: [{
      src: "nicePath",
      label: 1
    }],
    imageData: [{
      src: "nicePath",
      label: 2
    }]
  };
   


  const picker = renderer.create(<AvatarPicker {...exampleData}/>);
  expect(picker).toMatchSnapshot();

});

it('Check for click on avatar picker', () => {

  const exampleData =  {
    imageData: [{
      src: "niceFolder",
      label: 1
    }]
  };

  const mockFunction = jest.fn();

  const mockObject = {};
  const element = ReactTestUtils.renderIntoDocument(
    <AvatarPicker onClick={mockFunction} pickerToApp = {mockFunction} {...exampleData}/>,
  );
  const image = ReactDOM.findDOMNode(element);
  ReactTestUtils.Simulate.click(image);
  expect(mockFunction).toHaveBeenCalled();


})

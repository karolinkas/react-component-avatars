import React from 'react';
import ReactDOM from 'react-dom';

import AvatarPicker from './AvatarPicker';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const exampleData =  {
    imageData: [{
      src: "niceFolder",
      label: 1
    }]
  };
   


  const picker = renderer.create(<AvatarPicker {...exampleData}/>);
  expect(picker).toMatchSnapshot();

});

it('Check for click', () => {
  const exampleData =  {
    imageData: [{
      src: "niceFolder",
      label: 1
    }]
  };
   


  const picker = renderer.create(<AvatarPicker {...exampleData}/>);
  expect(picker).toMatchSnapshot();

});

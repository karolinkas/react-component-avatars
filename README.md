# Component Avatar Picker

  

This is a tiny react app consisting of 3 components.

1. One for the app itself that passes in image data into the data picker and handles opening and closing the avatar picker with a click and closing it with the ESC key. The left and right arrows help you to preview other avatars that can be submitted with enter.

	`<App></App>`

  

2. Avatar picker which is setting up a grid of available avatar images to select from. It gets the selected avatar from it's child element the image. 

	`<AvatarPicker></AvatarPicker>`

3. Avatar images that appear in the popover.

	`<Image></Image>`

  
  
  

# How to run this locally:

  

To install dependencies:
    ``
    $ yarn
    ``

  

To start development server
    ``
    $ yarn start
    ``
Find at: http://localhost:3000/
  

To run tests
    ``
    $ yarn test
    ``

  

# Approach

I decided to not use any other JS library to practise more Vanilla JS. To make sure the current image gets exchanged with the newly picked one I added custom event listeners, to make sure the fake http request is done and therefore the loading animation has been played.
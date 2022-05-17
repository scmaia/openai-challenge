
# Moody AI

A simple application using OpenAI api. The application provides a prompt interface with mood qualifiers for each interaction.


## Features

- Mood selector
- Option to favorite responses
- Filter per mood and/or favorites
- Local data persistance
- Responsive Design
- Vintage UI (own design & assets)


## Tech Stack

- Typescript
- React.js
- React Testing Library
- SASS & BEM
## Installation

Install with npm in root folder

```bash
  npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_OPENAI_KEY`


## Deployment

This project is currently deployed at:

[Add link](http://www.saramaia.me)

Slow initial loading may be due to host service's policy after period of inactivity.
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Design Decisions

- I've chosen to reset filters every time a new prompt is submitted to avoid having active filters that would ommit the new response.
- In addition to validating input lenght prior to making an api call, I have disabled the submit button for user experience purposes. The explicit name 'disabled' is expected to go with the vintage computer theme.
- Once the button is enabled, there is a glitch animation. Other glitch animations had been used originally, but were removed for looking like unintentional bugs.
- All the response records are saved as a single storage item, due to the fact that it is easer to load data this way. To improve on scalability and performance (assuming the project remains front-end only), saving each response individually would be a good alternative.
- The project currently keeps state in two places: localstorage and react state. I take advantage of this by saving errors to react state only but not localstorage, such that on reload the reponse records are 'clean' of error messages. 
## Next Steps

If I had more time to work on this project, I would:

- Add share button
- Add delete button for individual responses as well as delete all
- Would revise to save to localstorage only at component will unmount

## Authors

- [@Sara Maia](http://www.saramaia.me)


## Acknowledgements

 - [OpenAI](https://beta.openai.com/)


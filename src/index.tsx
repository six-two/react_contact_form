import React from 'react';
import ReactDOM from 'react-dom';
import Form from './app/Form';
import reportWebVitals from './reportWebVitals';
import Localizer from './app/Internationalisation';
import './App.scss';

// =============== TODO ================
// internationalize:  https://formatjs.io/docs/getting-started/installation/
// - translate placeholders, error messages, etc
// - put the translations in external files
// - get / set the language via the url
// - make the select look consistent across platforms
// IDEA: Add internationalisation to the react_template (it could get the language from the url)

ReactDOM.render(
  <React.StrictMode>
    <Localizer>
      <Form />
    </Localizer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

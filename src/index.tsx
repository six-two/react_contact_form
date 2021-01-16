import React from 'react';
import ReactDOM from 'react-dom';
import Form from './app/Form';
import reportWebVitals from './reportWebVitals';
import ContextLocalizer from './app/i18n/ContextLocalizer';
import './css/App.scss';

// =============== TODO ================
// - translate error messages, buttons, etc
// IDEA: Add internationalisation to the react_template (it could get the language from the url)

ReactDOM.render(
  <React.StrictMode>
    <ContextLocalizer handle_url_param={true}>
      <Form />
    </ContextLocalizer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

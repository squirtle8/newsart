const React = require('react');
const createRoot = require('react-dom/client');
const BrowserRouter = require('react-router-dom');
const App = require('./App.jsx');

const root = createRoot(document.getElementById("root"));

root.render(
  <App />
);
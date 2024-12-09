import { render } from 'preact';
import { Router } from 'preact-router';
import { Index } from './pages/index.jsx';




const Main = () => {
  return (
    <Router>
      <Index path="/" default />
    </Router>
)};

render(<Main />, document.getElementById('website'))
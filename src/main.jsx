import { render } from 'preact';
import { Router } from 'preact-router';
import { Index } from './pages/index.jsx';

const Main = () => (
    <Router>
      <Index path="/" />
    </Router>
  );

render(<Main />, document.getElementById('website'))
import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './routes';
import uniqid from 'uniqid';

function App() {
  return (
    <Router>
      <Rotas key={uniqid()} />
    </Router>
  );
}

export default App;

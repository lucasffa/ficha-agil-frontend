import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './routes';
import uniqid from 'uniqid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Rotas key={uniqid()} />
      <ToastContainer />
    </Router>
  );
}

export default App;

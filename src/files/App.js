import '../styles/App.css';
import AddProduct from './AddProduct';
import Report from './Report';

function App() {
  return (
    <div className='App'>
      <center>
        <h1>Costs Manager</h1>
        <AddProduct />
        <Report />
      </center>
    </div>
  );
}

export default App;

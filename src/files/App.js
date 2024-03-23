// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

import '../styles/app.css';
import AddProduct from './components/add_product';
import Report from './components/report';

function App() {
  return (
    <div className='app'>
      <center>
        <h1 className='header'>Costs Manager</h1>
        <div className='main'>
          <section className="form-section">
            <AddProduct />
          </section>
          <section className="report-section">
            <Report />
          </section>
          <footer className="footer">
            <p>&copy; 2024 Cost Manager</p>
            <p>Omer Sharoni & Michal Hagoel</p>
          </footer>
        </div>
      </center>
    </div>
  );
}

export default App;

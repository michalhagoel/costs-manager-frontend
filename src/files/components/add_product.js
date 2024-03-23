// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

import '../../styles/AddProduct.css';
import idb from '../../idb';
import errorHandler from '../utils/error_handle';

function AddProduct() {

  // Check that the cost we are trying to add is valid
  function validateItem() {
    const sum = document.getElementById('addSum').value;
    const category = document.getElementById('category').value;
    const name = document.getElementById('productName').value;
    const isNumber = !isNaN(sum) && !isNaN(parseFloat(sum));

    if (!isNumber) {
      alert('Sum must be a number!');
      return false;
    }

    if (category === '') {
      alert('Must choose a valid category');
      return false;
    }

    if (name.toString().trim() === '') {
      alert('You must provide a product name');
      return false;
    }

    return true;
  }

  async function submitItem() {
    try {
      // Check if item is valid
      const isValid = validateItem();

      if (!isValid) {
        return;
      }

      const db = await idb.openCostsDB();

      const name = document.getElementById('productName').value;
      const sum = document.getElementById('addSum').value;
      const category = document.getElementById('category').value;
      const description = document.getElementById('addDescription').value;

      // Add the new item to the costs db
      await db.addCost({ name, sum, category, description });
      alert('Cost item added sucesfully!');
    }
    catch (err) {
      errorHandler.handleError(err);
    }
  }

  return (
    <div>
      <h3>Add a Product</h3>
      <div className="container">
        <form className="form">
          <div className="row">
            <label>Product Name:</label>
            <input className="input" type="text" id="productName" name="productName" />
            <label>Choose Category:</label>
            <select className="dropdown" id="category">
              <option value=''> --- Choose --- </option>
              <option value='Food'> Food </option>
              <option value='health'> Health </option>
              <option value='Education'> Education </option>
              <option value='Travel'> Travel </option>
              <option value='Housing'> Housing </option>
              <option value='Other'> Other </option>
            </select>
          </div>
          <div className="row">
            <label>Add Sum:</label>
            <input className="input" type="text" id="addSum" name="addSum" />
            <label>Add Description:</label>
            <input className="input" type="text" id="addDescription" name="addDescription" />
          </div>
        </form>
      </div>
      <button className='button' onClick={submitItem}>Add Item</button>
    </div>
  );
}

export default AddProduct;

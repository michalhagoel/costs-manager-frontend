import '../styles/AddProduct.css';

function AddProduct() {
  return (
    <div>
        <h3>Add a Product</h3>
        <div className="container">
            <form className="form">
                <div className="row">
                    <label for="productName">Product Name:</label>
                    <input className="input" type="text" id="productName" name="productName" />
                    <label for="category">Choose Category:</label>
                    <select className="dropdown" id="category" onchange="chooseCategory()" >
                        <option> --- Choose --- </option>
                        <option> Food </option>
                        <option> Health </option>
                        <option> Education </option>
                        <option> Travel </option>
                        <option> Housing </option>
                        <option> Other </option>
                    </select>
                </div>
                <div className="row">
                    <label for="addSum">Add Sum:</label>
                    <input className="input" type="text" id="addSum" name="addSum" />
                    <label for="addDescription">Add Description:</label>
                    <input className="input" type="text" id="addDescription" name="addDescription" />
                </div>
            </form>
        </div>
        <button onClick={submitItem()}>Add Item</button>
    </div>
  );
}

function submitItem () {
    
}

export default AddProduct;

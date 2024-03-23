// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

import errors from '../../errors/index';

const handleError = (err) => {
  if (err instanceof errors.FailedToOpenDB) {
    console.log(err.message);
    alert(err.message);
    return;
  }

  if (err instanceof errors.FailedToCreateItemInDB) {
    console.log(err.message);
    alert(`Failed to add the item: ${err.name} with sum: ${err.sum}, category: ${err.category}, description: ${err.description}`);
    return;
  }

  if (err instanceof errors.FailedToDeleteItemInDB) {
    console.log(err.message);
    alert(`Failed to delete: ${err.name}`);
    return;
  }

  if (err instanceof errors.FailedToEditItemInDB) {
    console.log(err.message);
    alert(`Failed to edit the item name to: ${err.name}, sum to: ${err.sum}`);
    return;
  }

  if (err instanceof errors.FailedToGetReportDB) {
    console.log(err.message);
    alert(`Failed to get report for year: ${err.year}, month: ${err.month}`);
    return;
  }

  console.log(err);
}

const util = { handleError };

export default util;
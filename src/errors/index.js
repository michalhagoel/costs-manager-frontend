// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

class FailedToOpenDB extends Error {}

class FailedToCreateItemInDB extends Error {
  constructor(message, {name, sum, category, description}) {
    super(message);
		this.name = name;
		this.sum = sum;
		this.category = category;
		this.description = description;
  }
}

class FailedToDeleteItemInDB extends Error {
  constructor(message, id) {
    super(message);
		this.id = id;
  }
}

class FailedToEditItemInDB extends Error {
  constructor(message, {originName, name, originSum, sum, id}) {
    super(message);
		this.originName = originName;
		this.name = name;
		this.originSum = originSum;
		this.sum = sum;
		this.id = id;
  }
}

class FailedToGetReportDB extends Error {
  constructor(message, year, month) {
    super(message);
		this.year = year;
    this.month = month;
  }
}

const errors = {FailedToOpenDB, FailedToCreateItemInDB, FailedToDeleteItemInDB, FailedToEditItemInDB, FailedToGetReportDB};

export default errors;
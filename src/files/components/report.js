// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

import { useState } from 'react';
import '../../styles/Report.css';
import idb from '../../idb';
import errorHandler from '../utils/error_handle';
import StickyHeadTable from './sticky_head_table';

function Report() {
  const [report, setReport] = useState([]);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);
  const currentYear = (new Date()).getFullYear();
  const years = [];
  const months = [];

  // Get all 12 months as an array for the drop down list
  for (let i = 0; i < 12; i++) {
    const monthOption = <option key={`month${i}`} value={i + 1}>{i + 1}</option>;
    months.push(monthOption);
  }

  // Get the current year and 10 years back for the drop down list
  for (let i = 0; i < 10; i++) {
    const yearOption = <option key={`year${i}`} value={currentYear - i}>{currentYear - i}</option>;
    years.push(yearOption);
  }

  // Getting the report data from the db based on the chosen year & month
  const getReport = async () => {
    try {
      const db = await idb.openCostsDB();

      const year = parseInt(document.getElementById('years').value);
      const month = parseInt(document.getElementById('months').value);
  
      setYear(year);
      setMonth(month);
  
      const reportData = await db.getReport({ year, month });
      setReport(reportData);
    }
    catch (err) {
      errorHandler.handleError(err);
    }
  }

  // We save the chosen year & month to be able to refresh the report after deleting/editing an item
  async function refreshReport() {
    try {
      const db = await idb.openCostsDB();
      const reportData = await db.getReport({ year, month });
      setReport(reportData);
    }
    catch (err) {
      errorHandler.handleError(err);
    }
  }

  return (
    <div>
      <div className='container down'>
        <form className='form'>
          <div className='row space'>
            <select id='years'>{years}</select>
            <select id='months'>{months}</select>
          </div>
        </form>
      </div>
      <button className='m-b-10 button' onClick={getReport}>Get Report</button>
      <StickyHeadTable report={report} refreshReport={refreshReport} />
    </div>
  );
}

export default Report;

// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

import { useState } from 'react';
import '../../styles/Report.css';
import idb from '../../idb';
import DeleteModal from '../modals/delete_modal';
import EditModal from '../modals/edit_modal';
import errorHandler from '../utils/error_handle';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TablePagination } from '@mui/material';

function StickyHeadTable({ report, refreshReport }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Columns for the table that shows the report
  const columns = [
    { id: 'name', label: 'Name', minWidth: 50, align: 'center' },
    {
      id: 'sum',
      label: 'Cost',
      minWidth: 50,
      align: 'center',
      format: (value) => `$${Number.parseFloat(value).toFixed(2)}`,
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  // Delete an item from the db based on it's id
  const deleteCost = async (id) => {
    try {
      const db = await idb.openCostsDB();
      await db.deleteItem(id);
    }
    catch (err) {
      errorHandler.handleError(err);
    }
  }

  // Edit an item's name & sum
  const editCost = async (id, { newText, newSum }) => {
    try {
      const db = await idb.openCostsDB();
      await db.editItem(id, { newText, newSum });
    }
    catch (err) {
      errorHandler.handleError(err);
    }
  }

  // Changing the page on the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change the amount of rows to show per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className='reportTable m-t-20' sx={{ width: '80%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {report
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id !== 'actions') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      }
                      else {
                        return (
                          <TableCell key={column.id + row.id} align={column.align}>
                            <div className='flex-space-evenly'>
                              <DeleteModal
                                header={'Delete Item'}
                                text={'Do you wish to delete this item?'}
                                id={row.id}
                                refreshReport={refreshReport}
                                deleteFunc={deleteCost} />
                              <EditModal
                                header={'Edit Item'}
                                text={`Edit the item's display name`}
                                id={row.id} refreshReport={refreshReport}
                                currentSum={row.sum} currentName={row.name}
                                editFunc={editCost} />
                            </div>
                          </TableCell>
                        )
                      }

                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={report.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default StickyHeadTable;
// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({header, text, id, refreshReport, deleteFunc}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Delete item from the db using the given function, refresh the report and then close the modal
  function handleDelete () {
    deleteFunc(id);
    refreshReport();
    handleClose();
  }

  return (
    <div>
    <Button
      onClick={handleOpen}
      className='actionButton colorButton mr-1'
      variant="outlined">
        <DeleteIcon />
    </Button>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {header}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <div className='flex-space-between m-t-16'>
            <button className='m-b-10 error' onClick={handleDelete}>Delete</button>
            <button className='m-b-10 button' onClick={handleClose}>Close</button>
          </div>
        </Box>
      </Fade>
    </Modal>
  </div>
  );
}
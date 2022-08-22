import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ShareDialog({btnText}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
       <Button
             variant='contained' 
             style={{ 
                width:'200px',
                display:'flex',
                alignItems:'center'
             }}
             onClick={handleClickOpen}
            >
                 Share  <span className='ml-[8px]'>
                    <ShareIcon  fontSize='small'/>
                    
                    </span>
            </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Share Classroom Id
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          Your teacher mudassir
 has invited you to <br />

Classroom: 12 <br />
Subject: Maths


          </Typography>
          <Typography gutterBottom>
          To join the classroom, download Educate App:  <a  className='text-blue' href="https://play.google.com/store/apps/details?id=com.educate.theteachingapp" target='_blank'>
          https://play.google.com/store/apps/details?id=com.educate.theteachingapp

          </a>
          </Typography>
          <Typography gutterBottom>
            
Login as a student, and enter classroom ID: <br />
 <span  className='text-blue' >8621519553</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Share
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

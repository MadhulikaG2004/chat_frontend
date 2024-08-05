import React from 'react';
import { Popover, Box, Button, Typography } from '@mui/material';

const ProfilePopover = ({ anchorEl, onClose, onProfileClick, onLogoutClick }) => {
  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Profile Options
        </Typography>
        <Button onClick={onProfileClick} fullWidth variant="contained" sx={{ mb: 2 }}>
          Profile
        </Button>
        <Button onClick={onLogoutClick} fullWidth variant="contained" color="secondary">
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

export default ProfilePopover;

import { AppBar, Toolbar, IconButton, Box, Typography, Button } from '@mui/material';
import React from 'react';

export class Header extends React.Component<{
  title: string;
  hexColor: string;
  loggedIn: boolean;
  titleClassName: string;
  loginClassName: string;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}> {
  override render() {
    return (
      <Box style={{ flexGrow: 1, height: 64 }}>
        <AppBar position="static">
          <Toolbar style={{ height: 64 }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
            <Typography className={this.props.titleClassName} variant="h6" component="div" style={{ flexGrow: 1 }}>
              {this.props.title}
            </Typography>
            <Button className='step-click-login' onClick={this.props.loggedIn ? this.props.onLogoutClick : this.props.onLoginClick} color="inherit">
              {this.props.loggedIn ? 'Logout' : 'Login'}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

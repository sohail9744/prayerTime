import { React, useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CustomTime from './customTim';
import Config from './config';
import Help from './help';
import AccountMenu from '../components/profileBar';

const drawerWidth = 240;

export default function Dashboard() {
    const [focused, setFocused] = useState(1);
    const onHandleItem = (item) => {
        setFocused(item.key);
    }

    const handleItemClick = (index) => {
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {[{ name: 'Prayer Time', key: 0 }, { name: 'Configuration', key: 1 }, { name: 'Help', key: 2 }].map((item, index) => (
                        <ListItem onClick={() => onHandleItem(item)} key={item.key} disablePadding sx={{ px: '9px', py: '4px' }}>
                            <ListItemButton
                                disablePadding
                                sx={{
                                    marginBottom: '2px',
                                    '&:focus': {
                                        background: 'rgb(0 167 111 / 16%)',
                                        borderRadius: '6px',
                                    },
                                    background: item.key === focused ? 'rgb(0 167 111 / 16%)' : 'inherit',
                                    borderRadius: '6px',
                                }}>
                                <ListItemIcon >
                                    {index % 2 === 0 ? <InboxIcon sx={{ width: '45px' }} /> : <MailIcon sx={{ width: '45px' }} />}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {
                    focused === 0 ? <CustomTime /> : null
                }
                {
                    focused === 1 ? <Config /> : null
                }
                {
                    focused === 2 ? <Help /> : null
                }
            </Box>
        </Box>
    );
}
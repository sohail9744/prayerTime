import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SvgComponent from '@/public/clock_screen';
import { Box, Divider, Link, Switch } from '@mui/material';
import AlertBox from '../components/alertBox';
import MessageBox from '../components/messageBox';

export default function ClockScreens() {
    return (
        <Box display='flex' flexDirection='column' justifyContent='start'>
            <AlertBox text="We are working Hard and will soon add more templates" iconText="info" />
            <Typography variant='h5'>
                Preview url
            </Typography>
            <Box my={3}>
                <Link href="#" underline="always">
                    https://namazhub.com/p1678939
                </Link>
                <MessageBox text='My name is Mohammad Sohail'/>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography sx={{ my: 3 }} variant='h5'>
                Template
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={SvgComponent}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Default Theme
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Our default theme offers a serene backdrop, seamlessly displaying accurate prayer timings for Masajid worldwide. Embrace a harmonious routine as you connect with your faith, guided by the convenience of our intuitive design.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Switch aria-label='Switch' color='success' disabled defaultChecked />
                </CardActions>
            </Card>
        </Box>
    );
}
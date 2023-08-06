import React from 'react';
import FeaturedInfo from "./widget/FeaturedInfo";

import WidgetLg from "./widget/WidgetLg";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Linerechart from "./chart/linerechart";
import WidgetTs from "./widget/WidgetTs"
import { Typography } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

//info ng sales revenue,linecharts
export default function Dashboard() {
    return (



        <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={3}>
        {/* Dashboard */}
            <Grid container item xs={12} md={10}>
                <Typography variant='h3' marginY={2} marginLeft={2}> Dashboard</Typography>
            </Grid>

                <Grid item xs={30}>

                    <FeaturedInfo />
                
                </Grid>
             

          
            </Grid>
        </Box>







    );
}




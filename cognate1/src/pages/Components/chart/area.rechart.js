// src/components/area.rechart.js

import React from "react";
import { AreaChart,
    Area, 
    YAxis,
    XAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

import { dataAB  } from "../../../dummyData";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

class AreaRechartComponent extends React.Component {



    render() {
        return (


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>

                    <Grid item xs>
            <AreaChart width={630} height={220} data={dataAB}

                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                
                <defs>
                   
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Product A" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="Procuct B" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>

                    </Grid>




                </Grid>
            </Box>


        )
    };
}

export default AreaRechartComponent;
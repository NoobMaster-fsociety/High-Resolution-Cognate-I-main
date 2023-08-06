import { userData } from "../../../dummyData";
import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AreaRechartComponent from '../chart/area.rechart';
import "./areachart.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function App() {
    return (



        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>

                <Grid item xs>
                    
    
                    <BarChart
                  
                        width={630}
                        height={320}
                        data={userData}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0
                        }}
                      
        >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="PostReach" fill="#8884d8" />

      
                        </BarChart>

           
                </Grid>
                <Grid item xs>
                    <div className="featuredchart">
                    <h2> Sales Comparison </h2>
                    <AreaRechartComponent />
                    </div>

                </Grid>
            </Grid>
        </Box>


    




    );
}

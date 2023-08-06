import { React, useEffect, useState } from 'react';
import "./featuredInfo.css";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import WidgetLg from "./WidgetLg";
import WidgetTs from "./WidgetTs";
import WidgetMs from "./WidgetMs";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




export default function FeaturedInfo() {



    const [data, setData] = useState(0);

    let isSuscribe = true

    useEffect(() => {

        axios.get('http://localhost/Reactjs/cognate1%20api/totalorders.php')
            // .then((response) => response.text())
        .then((response) => {
            if (isSuscribe){
                setData(response.data)
            }
        }


        
        )

        return () => isSuscribe = false
    });

    const [data1, newData1] = useState(0);

    useEffect(() => {
        
        fetch('http://localhost/Reactjs/cognate1%20api/Todaysales.php')
        .then((response) => response.text())
            .then((response) => {
                if (isSuscribe){
                    newData1(response)
                }
            });

            
        return () => isSuscribe = false
    });

    const [data2, newData2] = useState(0);

    useEffect(() => {
        fetch('http://localhost/Reactjs/cognate1%20api/Countpending.php')
            .then((response) => response.text())
            .then((response) => {
                if (isSuscribe){
                    newData2(response)
                }
            }
            );

            
        return () => isSuscribe = false
    }, []);


    

   





    return <div>


        <Box sx={{ flexGrow: 1 }}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>

    {/* Sales revenue */}
           <Grid container spacing={3}>
  
                <Grid item xs={4}>

                    <div className="featured">
                        <div className="featuredItem">
                            <span className="featuredTitle">Sales Revenue</span>
                            <div className="featuredMoneyContainer">
                                <span  className="featuredMoney">

                                    ₱ {parseInt(data)?.toLocaleString(undefined, {maximumFractionDigits: 2})}

                                </span>




                            </div>
                            <span className="featuredSub"></span>

                        </div>
                    </div>
                </Grid>

    {/* Daily sales */}
                 <Grid item xs={4}>

                    <div className="featuredItem">
                        <span className="featuredTitle">Daily Sales</span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">

                                ₱ {parseInt(data1)?.toLocaleString(undefined, {maximumFractionDigits: 2})}



                            </span>

                        </div>

                    </div>

                </Grid>
{/* 
    Pending orders */}
                <Grid item xs={4}>
                    <div className="featuredItem">
                        <span className="featuredPending">Pending Orders</span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredPendingMoney">

                            ₱ {parseInt(data2)?.toLocaleString(undefined, {maximumFractionDigits: 2})}



                            </span>

                        </div>

                    </div>

                </Grid>
              


                     {/* Daily Sales     */}
                <Grid item xs={6}>
                    <div className="featuredItem">
                        <span className="featuredTitle">Daily Sales</span>
                        <WidgetTs />

                    </div>

                </Grid>
           
        {/* Monthly Sales      */}
                <Grid item xs={6}>
                    <div className="featuredItem">
                        <span className="featuredTitle">Monthly Sales </span>
                        

                        
                        <WidgetMs />

                    </div>

                </Grid>
 
    {/* Sales Report */}
                <Grid item xs={10}>
                    <div className="featuredItem">
                        <span className="featuredTitle">Sales Report</span>
                        <WidgetLg />
                 
                    </div>

           
                </Grid>


         

</Grid>
        </Box> 
       

    </div>;


















}

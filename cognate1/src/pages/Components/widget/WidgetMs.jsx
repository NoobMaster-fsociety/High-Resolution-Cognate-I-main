// Library components

import {
    Grid,
    InputAdornment,
    Typography,
    Fab,
    IconButton,
    Collapse,
    Button,
    FormControlLabel,
    Switch,
    Box,
    Alert,
    RadioGroup,
    Radio,
    Select,
    Chip,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material'
import { CTextField } from '../products/Products'
import { CcTextField } from '../Stocks';
import React, { useEffect, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// Icons
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment'

// Routes
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


import LOGO from '../../icons/user.png'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';



const Invoice = () => {
    // Navigation
    let NavS = useNavigate();


    // Column header
    const columns = [

        // ID Column
        {
            field: 'Customer_ID',
            headerName: 'ID',
            width: 70,
            headerAlign: 'center',

            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "black",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },

        // ID Column
        {
            field: 'Customer_name',
            headerName: 'name',
            width: 200,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',

            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "black",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }

        },

      

        {
            field: 'Customer_purchase',
            headerName: 'product purchase',
            width: 150,
            headerAlign: 'center',

            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "black",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },

        {
            field: 'Customer_date',
            headerName: 'date',
            width: 150,
            headerAlign: 'center',

            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "black",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },

        {
            field: 'Customer_total',
            headerName: 'total',
            width: 130,
            headerAlign: 'center',

            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "black",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },

        {
            field: 'Customer_payment',
            headerName: 'status',
            width: 130,
            headerAlign: 'center',

            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "green",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },

    ];

    // Data 
    const [Data, set] = useState()


    // // Htttp get request
    useEffect(() => {
        let isApiSubscribed = true
        axios.get('http://localhost/REACTjs/cognate1%20api/Dashmonth.php')
            .then(res => {
                if (isApiSubscribed)
                {
                   
                    set(res.data) 
                    // console.log(res.data)
                }

            }
            )
            .catch(err => console.log(err))

            return () => {
                // cancel the subscription
                isApiSubscribed = false
              };
    })




    return (
        <div className="widgetLgTitle">
         
                    {/* Conatainer button */}
                    <Grid item md={3} xs={12}>

                        {/* Container para may padding */}
                        <Grid
                            container
                            padding={5}
                            direction="row"
                    justifyContent="center"
                    alignItems="center">

                            {/* Button add */}
                          

                        </Grid>

                    </Grid>



                    {/* Container for table */}
                    <Grid item md={12}>

                        {/* Para may padding */}
                        <Grid
                            container
                            direction="row"
                    justifyContent="center"
                    alignItems="center"
                            padding={5}>


                    {/* pang size at background color */}



                    <Grid

                                container
                                style={{
                                    height: 400,
                                    width: 1000,
                                    backgroundColor: 'lightgrey',
                                    border: '2px solid black',
                                    borderRadius: '30px'
                                }}
                            >


                                {/* Data table */}
                                <DataGrid
                                    columns={columns}
                                    getRowId={(rows) => rows.Customer_ID}
                                    rows={Data} // data na pinasok yung data 

                                    pageSize={10}
                            
                                />

                            </Grid>


                        </Grid>

            </Grid>

















          

        </div>
    )
}

export default Invoice
// Library components

import {
    Grid, Typography,

} from '@mui/material'

import React, { useEffect, useState } from 'react'

// Icons


// Routes
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import "./featuredInfo.css";



const WidgetTs = () => {


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
    //search data variable
    const [total, setTotal] = useState()

    // Data 
    const [Data, set] = useState()


   

    // Htttp get request
    useEffect(() => {
        let isApiSubscribed = true
        axios.get('http://localhost/REACTJS/cognate1%20api/Dashtrans.php')
            .then(res => 
                {
                    if(isApiSubscribed) {

                 
                    set(res.data)
                    setTotal([res.data]
                        .map(total=>total.Customer_total)
                        .reduce((a,b)=> a+b,0)
                        )

                    }
                }

                
                )
            .catch(err => console.log(err))

        return () => isApiSubscribed = false
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

                        {/* <span className="featuredTitle">Total daily sales: </span>
                        <span className="featuredTitleperoBlack">{total} </span> */}

            </Grid>

















          

        </div>
    )
}

export default WidgetTs
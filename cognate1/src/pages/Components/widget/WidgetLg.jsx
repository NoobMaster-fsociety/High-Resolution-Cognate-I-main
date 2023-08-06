// Library components

import {
    Button,
    Grid,

} from '@mui/material'

import React, { useEffect, useState } from 'react'
import "./featuredInfo.css";



// Icons


// Routes

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';



import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';


const Months = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const Years = [  "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031"];
const Days = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

const WidgetLg = () => {

// Column header for DataGrid
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





    //Sales report of specific years and month
    const [total, setTotal] = useState(

    )

    // Data 
    const [Data, set] = useState()



    // // Htttp get request
    useEffect(() => {
        let isSuscribe = true
        axios.get('http://localhost/REACTjs/cognate1%20api/CustomerdataPAID.php')
            .then(res => 
                {
                    if (isSuscribe) {
                        set(res.data)   
                    }
                }

                

            )
            .catch(err => console.log(err))

    return () => isSuscribe = false
    })


    
// For filtering the table bia 3 comboboxes
    const filter_table = () =>{

       if (Dvalue) 
       {
        return Data?.filter(
            date=>date.Customer_date
            .toLowerCase()
            .includes(Yvalue + "-" + Mvalue + "-" + Dvalue) )

       }else{
        return Data?.filter(
            date=>date.Customer_date
            .toLowerCase()
            .includes(Yvalue + "-" + Mvalue ) )
       }

    }

    // Filtering and get total
    const filter_data = () => {

        if (Dvalue) 
        {
              return Data?.filter(
                date=>date.Customer_date
                .toLowerCase()
                .includes(Yvalue + "-" + Mvalue + "-" + Dvalue))
                .map(e=>e.Customer_total)
                .reduce((a,b)=>a+b, 0 )
        }else{
            return Data?.filter(
                date=>date.Customer_date
                .toLowerCase()
                .includes(Yvalue + "-" + Mvalue))
                .map(e=>e.Customer_total)
                .reduce((a,b)=>a+b, 0 )
           }

    }

    const [Mvalue, setMValue] = useState(Months[0]);
    const [Yvalue, setYValue] = useState(Years[2]);
    const [Dvalue, setDValue] = useState(Days[0]);
  

  

    return (



        <div className="widgetLgTitle">

                    {/*======================================================ComboBox================================================= */}
            <Grid item md={10} xs={13}>

           
                <FormControl sx={{ m: 1, minWidth: 120 }}>
               

                    <br />

                    {/* Year */}
                    <Autocomplete
                        name="searchYear"
                        value={Yvalue}
                        onChange={(event, newValue) => {
                            setYValue(newValue);
                        }}
                       
                        options={Years}
                        sx={{ width: 180 }}
                        renderInput={(params) => <TextField {...params} label="Years" />}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
               

                    <br />

                     {/* Month */}
                    <Autocomplete

                        name="searchMonth"
                        value={Mvalue}
                        onChange={(event,newValue) => {
                            newValue ? 
                            setMValue(newValue) : setMValue("")
                        }}

                        options={Months}
                        sx={{ width: 220 }}
                        renderInput={(params) => <TextField {...params} label="Months" />}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
               

               <br />

                {/* Day */}
               <Autocomplete

                   name="searchDay"
                   value={Dvalue}
                   onChange={(event,newValue) => {
                       newValue ? 
                       setDValue(newValue) : setDValue("")
                   }}

                   options={Days}
                   sx={{ width: 220 }}
                   renderInput={(params) => <TextField {...params} label="Days" />}
               />
           </FormControl>

             
          
            </Grid>


            {/*======================================================ComboBox================================================= */}
                    {/* Container for table */}
                    <Grid item md={12}>

                        {/* Para may padding */}
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            padding={5}>


    


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
                                   rows={filter_table()} // data na pinasok yung data 

                                    pageSize={10}
                            
                                />

                            </Grid>

                           


                        </Grid>
                        <span className="featuredTitle">Total sales: </span>
                        <span className="featuredTitleperoBlack">{filter_data()?.toLocaleString(undefined, {maximumFractionDigits: 2})} </span>

            </Grid>

        </div>



         
    










    )
}

export default WidgetLg
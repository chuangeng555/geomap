import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import LocationDetail from './LocationDetail';
import { Redirect, useHistory } from "react-router-dom";
const columns = [
    { field: 'summary', headerName: 'Summary',  width: 150 },
    { field: 'create_date', headerName: 'Date Created', width: 200 }
  ];



export default function LocationDetailsList(props){
    const [dataArray, setDataArray] = useState(null)
    const [openDetailsBoolean, setOpenDetailsBoolean] = useState(false)
    const [openSingleDetail, setOpenSingleDetail] =  useState(false)

  const { locationData, id  } = props;
  let history = useHistory();



    useEffect(() => {
        const dateFormat = (date) => {

            let day = date.getDate();
            let month = date.getMonth() + 1 ;
            let year = date.getFullYear();
          
            let hrs = date.getHours();
            
            let mins = date.getMinutes();
            
            const ampm = hrs >= 12 ? 'pm' : 'am';
            
            hrs %= 12; //to get the num of pm or am 
            
            hrs = hrs || 12; //to tackle 0000 hrs problem 
            
            mins = mins < 10 ? `0${mins}` : mins;
          
            const strTime = `${day}/${month}/${year} ${hrs}:${mins} ${ampm}`;
            
            return (strTime);
          
          }


        const templocationData = locationData.locationData

        const output = [...templocationData.map((item) => {

            var date = new Date(item.create_date);
            
            return {
                id: item._id,
                summary: item.summary,
                description: item.description,
                create_date: dateFormat(date)
            }
        })]


        setOpenDetailsBoolean(true) 
        setDataArray(output)

    }, [locationData.locationData])

    function test(e){
        
        //console.log(e.data.id) //small
        //console.log(id) //overall 
        //go root than search for inside
        history.push(`/content/${id}/${e.data.id}`) 
    
    }

        return (
            <div id="datapopup" className="popup">
                <div style={{ height: 400, width: '100%' }}>
                    {openDetailsBoolean ? <DataGrid style={{width: '200%'}} rows={dataArray} columns={columns}  pageSize={5} rowsPerPageOptions={[5, 10]} disableColumnMenu={true} onRowSelected={(e) => {test(e)}}/> : ""}
                </div>
            </div>

            
        )
    
}


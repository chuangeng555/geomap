import React, { Component } from "react";
import { DataGrid } from '@material-ui/data-grid';







const columns = [
    
    { field: 'summary', headerName: 'Summary',  width: 130 },
    { field: 'create_date', headerName: 'Date Created', width: 200 }
  ];



export default class LocationDetailsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataArray : null,
            openInfo: false, 
        }
    }

    componentDidMount(){

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


        const templocationData = this.props.locationData.locationData

        const output = [...templocationData.map((item) => {

            var date = new Date(item.create_date);

            return {
                id: item._id,
                summary: item.summary,
                description: item.description,
                create_date: dateFormat(date)
            }
        })]

        console.log(output)

        this.setState({
            dataArray: output
        })
    }

    render(){

        return (
            <div id="datapopup" className="popup">
                <div style={{ height: 400, width: '100%' }}>
                    {this.state.dataArray ? <DataGrid style={{width: '100%'}} rows={this.state.dataArray} columns={columns}  pageSize={5} rowsPerPageOptions={[5, 10]} disableColumnMenu={true} onRowSelected={(e) => console.log(e)}/> : null}
                </div>
            </div>
            
        )
    }
    
}


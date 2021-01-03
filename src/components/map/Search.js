import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class Search extends Component{


    render(){
        const { value, onChange, list , onClick, onSubmit} = this.props;
         
        return(
            <div className="popup"> 
            <form>
            <Button
            variant="contained"
            color="secondary"
            onClick = {onClick} 
            ></Button> 
            Search {" "}
            <input type="text" value={value} onChange={onChange}  />
            </form>
            {list.filter((onChange) => (item) => item.SEARCHVAL.toLowerCase().includes(onChange.toLowerCase())).map((item, k) => (
            <div key = {k}>
                <span>{item.ADDRESS}</span> {" "}
                <button onClick={() => onSubmit({item})}> Submit </button>
            </div>
            ))}
            </div>
        );
    }
} 
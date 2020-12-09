import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

export default function Popup() {
    const [submission, setSubmission] = useState(0);

    return (
        <div className='popup'>
            <Button id = "close" variant="contained" color="secondary" type="submit" onClick={() => setSubmission(submission + 1)}>X</Button>
            <form className="form"> 
                    Title : {" "} 
                    <input type="text" name="title"/>
                    Location : {" "} 
                    <input type="text" name="location"/>
                    Description : {" "}
                    <textarea id="description"></textarea>
                    <Button variant="contained" color="primary" type="submit" onClick={() => setSubmission(submission + 1)}>Submit</Button>
            </form>
        </div>

    )
}
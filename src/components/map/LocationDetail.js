import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";


//const db = 'https://0ihrzn8o0k.execute-api.ap-southeast-1.amazonaws.com/final'

const db = process.env.REACT_APP_DB;


export default function LocationDetail({match}) {
    const history = useHistory();
    // You can use Hooks here!
    const [locationName, setLocationName] = useState("")
    const [summary, setSummary] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")


    useEffect(() => {
        //console.log(match.params)

            try {
            axios.get( db + `/locations/${match.params.root_id}`
            ).then((res) => {
                //console.log(res.data.data.locationName)
                setLocationName(res.data.data.locationName)
                res.data.data.locationData.forEach((o) => {
                    if (o._id === match.params.inner_id) {
                        //console.log(o)
                        setSummary(o.summary)
                        setDescription(o.description)
                        setDate(new Date(o.create_date).toString())
                    } else {
                        //no data
                    }
                })
            }).catch((error) => {
                //console.log(error) 
            })

            } catch(e) {
                //console.log(e)
            }

    }, [])

    function routeBack(){
        history.goBack();
    }

    return <div>
        <div class="content">
        <Button id="content-button" variant="contained" color="primary" onClick={() => routeBack()} >Back</Button>
        <article>
            <span>Created on: {date}</span>
            <h1>Location: {locationName}</h1>
            <h3>{summary}</h3>
            <div>
                {description}
            </div>
        </article> 
        </div>
    </div>;
  }
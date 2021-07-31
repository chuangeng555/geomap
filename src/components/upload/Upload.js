import React, { useRef }from "react";
import Typography from '@material-ui/core/Typography';
import S3 from "react-aws-s3"; 
import Button from "@material-ui/core/Button";


export default function Upload({sendFile, sendFileName}){
    const fileInput = useRef();
    

      const handleFileUploadChange = (event) => {
          event.preventDefault(); 
          let file = fileInput.current.files[0]
          let newFileName = fileInput.current.files[0].name
          sendFile(file)
          sendFileName(newFileName)
      }

    return (
        <>
        <Typography gutterBottom align='center'>
          <Button
            variant="contained"
            component="label"
            align="center"
          >
            Upload Image
            <input
              ref={fileInput}
              type="file"
              hidden
              onChange={handleFileUploadChange}
            />
          </Button>          
        </Typography>

        </> 
    )
}
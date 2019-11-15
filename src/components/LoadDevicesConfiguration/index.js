import React, { useState } from 'react';
import { Row, Button, Alert, Input } from 'reactstrap';
import fileSchema from './fileSchema';
// import Dropzone from 'react-dropzone';

export default ({ setDevices }) => {
  let filereader;

  let [fileContents, setFileContents] = useState(null);
  const handleFileRead = e => {
    const content = filereader.result;
    // console.log(content);
    setFileContents(content);
  };

  const handleFileChosen = file => {
    filereader = new FileReader();
    filereader.onloadend = handleFileRead;
    filereader.readAsText(file);
  };

  let validationError = null;
  let isValid = null;
  if (fileContents) {
    try {
      fileSchema.validateSync(JSON.parse(fileContents));
      isValid = true;
    } catch (e) {
      validationError = e.message;
    }
  }

  return (
    <Row>
      <Input
        type="file"
        id="file-upload"
        accept=".json"
        onChange={e => handleFileChosen(e.target.files[0])}
      />
      {validationError && (
        <Alert color="danger">Configuration invalid: {validationError}</Alert>
      )}
      {isValid && (
        <div>
          <Alert color="success">Configuration Valid</Alert>
          <Button
            onClick={() => {
              setDevices(JSON.parse(fileContents).devices);
            }}
          >
            Submit
          </Button>
        </div>
      )}

      {/* <Dropzone onDrop={acceptedFiles => readFile(console.log(acceptedFiles[0]))}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone> */}
    </Row>
  );
};

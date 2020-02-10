import React, { useState } from 'react';
import {
  Row,
  Button,
  Alert,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import fileSchema from './fileSchema';
// import Dropzone from 'react-dropzone';

export default ({ addDevice }) => {
  let filereader;

  let [fileContents, setFileContents] = useState(null);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

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
      <Button color="info" onClick={toggleModal}>
        Load Devices Configuration File
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Load Devices Configuration File
        </ModalHeader>
        <ModalBody>
          <Input
            type="file"
            id="file-upload"
            accept=".json"
            onChange={e => handleFileChosen(e.target.files[0])}
          />
          {validationError && (
            <Alert color="danger">
              Configuration invalid: {validationError}
            </Alert>
          )}
          {isValid && (
            <div>
              <Alert color="success">Configuration Valid</Alert>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              const devices = JSON.parse(fileContents).devices;
              devices.forEach(device => {
                addDevice(device);
              });
              toggleModal();
            }}
            disabled={!isValid}
          >
            Submit
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};

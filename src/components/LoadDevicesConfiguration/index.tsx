import React, { useState } from "react";
import {
  Row,
  Button,
  Alert,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { fileSchema } from "./fileSchema";
import { DeviceFileConfiguration } from "../../store/devices/types";

export default ({
  addDevice
}: {
  addDevice: (deviceConnectionInformation: DeviceFileConfiguration) => {};
}) => {
  let filereader: FileReader;

  let [fileContents, setFileContents] = useState<string | undefined>(undefined);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const content = filereader.result?.toString();
    // console.log(content);
    setFileContents(content);
  };

  const handleFileChosen = (file: File | false | null) => {
    if (!file) {
      console.log("No files chosen");
    } else {
      filereader = new FileReader();
      filereader.onloadend = handleFileRead;
      filereader.readAsText(file);
    }
  };

  let validationError = null;
  let isValid = null;
  if (fileContents) {
    try {
      fileSchema.validateSync(JSON.parse(fileContents as string));
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
            onChange={e =>
              handleFileChosen(e.target.files && e.target.files.length > 0 && e.target.files[0])
            }
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
              const devices = JSON.parse(fileContents as string).devices;
              devices.forEach((device: DeviceFileConfiguration) => {
                addDevice(device);
              });
              toggleModal();
            }}
            disabled={!isValid}
          >
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};
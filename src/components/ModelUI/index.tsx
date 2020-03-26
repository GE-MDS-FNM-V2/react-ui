import React from 'react';
import { useState } from 'react';
import { Input, Button, ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { v1, ActionTypeV1, ActionObjectV1 } from '@ge-fnm/action-object';
import {
  IDataTypeKind,
  DataType,
  Action,
  Leaf,
  List,
  Map,
  Set
} from '@ge-fnm/data-model';
import { DeviceErrorType } from '../../store/devices/types';

export const ModelUI = ({
  model,
  path,
  setValue,
  errors
}: {
  model: DataType;
  path?: string[];
  setValue: (valuePath: string, modifyingValue: string) => void;
  errors: DeviceErrorType[];
}) => {
  const [inputValue, setInputValue] = useState('');
  const currentPath = path || [];

  const errorsForThisNode = errors
    .filter(
      // json.stringify is a quick and easy way to check to see if the arrays are equal
      err => JSON.stringify(err.path) === JSON.stringify(currentPath)
    )
    .map(err => {
      return <Alert color="danger">{err.errorObj.message}</Alert>;
    });

  if (model.getObjectType() === IDataTypeKind.Action) {
    let actionModel = model as Action;
    return (
      <React.Fragment>
        <label className="d-flex" style={{ fontWeight: 'bold' }}>
          {actionModel.getObjectType()}
        </label>
        {errorsForThisNode}
        <p>Number of Runs: {actionModel.numberRuns}</p>
        <p>Object Type: {actionModel.objectType}</p>
        <ListGroup>
          {actionModel.children && actionModel.length === 0 && (
            <p>No items in list...</p>
          )}
          {actionModel.children &&
            actionModel.length !== 0 &&
            actionModel.children.map((value, index) => {
              return (
                <ListGroupItem>
                  <ModelUI
                    model={value}
                    path={[...currentPath, 'TODO - action']}
                    errors={errors}
                    setValue={setValue}
                  />
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </React.Fragment>
    );
  } else if (model.getObjectType() === IDataTypeKind.Leaf) {
    let leafModel = model as Leaf;

    return (
      <React.Fragment>
        <label className="d-flex" style={{ fontWeight: 'bold' }}>
          {[...currentPath].join('/')}
        </label>
        <p>Value: {JSON.stringify(leafModel.getValue())}</p>
        {errorsForThisNode}
        <Input type="text" onChange={e => setInputValue(e.target.value)} />
        <Button
          onClick={() => setValue([...currentPath].join('/'), inputValue)}
        >
          SET
        </Button>
        <p>
          Permissions:
          {Object.entries(leafModel.getPermissions()).map(([k, v]) => {
            return (
              <pre>
                {k}: {JSON.stringify(v)}
              </pre>
            );
          })}
        </p>
      </React.Fragment>
    );
  } else if (model.getObjectType() === IDataTypeKind.Map) {
    let mapModel = model as Map;
    return (
      <React.Fragment>
        <label className="d-flex" style={{ fontWeight: 'bold' }}>
          {[...currentPath].join('/')}
        </label>
        {errorsForThisNode}
        <ListGroup>
          {mapModel.children && mapModel.length === 0 && (
            <p>No items in list...</p>
          )}
          {mapModel.children &&
            mapModel.length !== 0 &&
            Object.entries(mapModel.children).map(([key, value]) => {
              return (
                <ListGroupItem>
                  <ModelUI
                    model={value}
                    path={[...currentPath, key]}
                    setValue={setValue}
                    errors={errors}
                  />
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </React.Fragment>
    );
  } else {
    return <p>Unknown/unsupported data model type.</p>;
  }
};

export default ModelUI;

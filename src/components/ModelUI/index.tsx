import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  IDataTypeKind,
  DataType,
  Action,
  Leaf,
  List,
  Map,
  Set
} from '@ge-fnm/data-model';

const ModelUI = ({ model, path }: { model: DataType; path?: string[] }) => {
  const currentPath = path || [];
  console.log(model);
  if (model.getObjectType() === IDataTypeKind.Action) {
    let actionModel = model as Action;
    return (
      <React.Fragment>
        <label className="d-flex" style={{ fontWeight: 'bold' }}>
          {actionModel.getObjectType()}
        </label>
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
                  />
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </React.Fragment>
    );
  } else if (model.getObjectType() === IDataTypeKind.Leaf) {
    let leafModel = model as Leaf;
    console.log(leafModel.getValue());
    return (
      <React.Fragment>
        <label className="d-flex" style={{ fontWeight: 'bold' }}>
          {[...currentPath].join('/')}
        </label>
        <p>Value: {JSON.stringify(leafModel.getValue())}</p>
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
        <ListGroup>
          {mapModel.children && mapModel.length === 0 && (
            <p>No items in list...</p>
          )}
          {mapModel.children &&
            mapModel.length !== 0 &&
            Object.entries(mapModel.children).map(([key, value]) => {
              return (
                <ListGroupItem>
                  <ModelUI model={value} path={[...currentPath, key]} />
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

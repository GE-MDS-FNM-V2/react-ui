import {
  CommunicationMethodV1,
  ProtocolV1,
  GEErrors
} from '@ge-fnm/action-object';

const GEError = GEErrors.GEError;

export type DeviceFileConfiguration = {
  uri: string;
  communicationMethod: CommunicationMethodV1;
  protocol: ProtocolV1;
  username?: string;
  password?: string;
};

export type DeviceErrorType = {
  errorObj: Error;
  path: string[];
};

export type Device = {
  id: string;
  uri: string;
  communicationMethod: CommunicationMethodV1;
  protocol: ProtocolV1;
  username?: string;
  password?: string;
  loading: string[][];
  data?: any;
  errors: DeviceErrorType[];
  initialized?: boolean;
};

export type DevicesList = Device[];

export type DevicesState = {
  devices: DevicesList;
  selectedDeviceID: string | null;
};

export const ERROR_NO_RESPONSE_FOUND = new Error('ERROR - no response found');

import { CommunicationMethodV1, ProtocolV1 } from '@ge-fnm/action-object';

export type DeviceFileConfiguration = {
  uri: string;
  communicationMethod: CommunicationMethodV1;
  protocol: ProtocolV1;
  username?: string;
  password?: string;
};

export type Device = {
  id: string;
  uri: string;
  communicationMethod: CommunicationMethodV1;
  protocol: ProtocolV1;
  username?: string;
  password?: string;
  loading?: boolean;
  data?: any;
  error?: any;
  initialized?: boolean;
};

export type DevicesList = Device[];

export type DevicesState = {
  devices: DevicesList;
  selectedDeviceID: string | null;
};

export const ERROR_NO_RESPONSE_FOUND = new Error('ERROR - no response found');

import { mixed, string, object, array } from 'yup';
import { CommunicationMethodV1, ProtocolV1 } from '@ge-fnm/action-object';

// uri: string;
// commMethod: CommunicationMethodV1;
// protocol: ProtocolV1;
// username?: string;
// password?: string;
// id?: string
export const fileSchema = object().shape({
  devices: array()
    .of(
      object().shape({
        communicationMethod: mixed()
          .oneOf(Object.keys(CommunicationMethodV1))
          .required(),
        protocol: mixed()
          .oneOf(Object.keys(ProtocolV1))
          .required(),
        username: string(),
        password: string(),
        uri: string().required()
      })
    )
    .required()
});

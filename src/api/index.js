import Axios from 'axios';
import { executeCommunication } from '@ge-fnm/communication-selector-module';
import {
  v1,
  ActionTypeV1,
  CommunicationMethodV1,
  ProtocolV1
} from '@ge-fnm/action-object';
import { Parser } from '@ge-fnm/data-model';

export const createRadioAPI = async (IP_ADDR, USERNAME, PASSWORD) => {
  let init_action = v1
    .create({
      version: 1,
      actionType: ActionTypeV1.INIT,
      commData: {
        commMethod: CommunicationMethodV1.HTTP,
        protocol: ProtocolV1.JSONRPC,
        username: USERNAME,
        password: PASSWORD
      },
      modifyingValue: '',
      path: [],
      response: undefined,
      uri: IP_ADDR
    })
    .serialize();

  await executeCommunication(init_action);

  return {
    runCommand: async () => {
      let get_action = v1
        .create({
          version: 1,
          actionType: ActionTypeV1.GET,
          commData: {
            commMethod: CommunicationMethodV1.HTTP,
            protocol: ProtocolV1.JSONRPC
          },
          modifyingValue: '',
          path: ['/serv:services'],
          response: undefined,
          uri: URL
        })
        .serialize();

      const data = await executeCommunication(get_action);
      const newResp = v1.deserialize(data);
      const yangModel = JSON.parse(newResp.information.response);
      const parser = new Parser.YangParser();
      console.log(yangModel);
      const result = parser.parse(JSON.stringify(yangModel.result.data));
      console.log(
        'Here is if snpm is enabled/diabled represented in an internal data model',
        result
      );
    }
  };
};

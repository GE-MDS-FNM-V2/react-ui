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
          path: ['/serv:services/snmp:snmp/agent/enabled'],
          response: undefined,
          uri: IP_ADDR
        })
        .serialize();

      console.log(get_action);
      debugger;

      const data = await executeCommunication(get_action);

      try {
        const newResp = v1.deserialize(data);
        const yangModel = JSON.parse(newResp.information.response);
        console.log(
          'Got back a response from the radio of',
          yangModel.result.data
        );
        console.log('Attempting to parse into internal data model');
        const parser = new Parser.YangParser();
        const result = parser.parse(JSON.stringify(yangModel.result.data));
        console.log(
          `Here is if snmp is enabled/diabled represented in an internal data model ${JSON.stringify(
            result,
            null,
            4
          )}`
        );
        alert(
          `Here is if snmp is enabled/diabled represented in an internal data model ${JSON.stringify(
            result,
            null,
            4
          )}`
        );
      } catch (error) {
        console.error(
          'Could not parse response into internal data model',
          error
        );
      }
    }
  };
};

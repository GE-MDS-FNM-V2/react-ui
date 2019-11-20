import * as yup from 'yup';

export default yup.object().shape({
  devices: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        connectionInfo: yup
          .object()
          .shape({
            type: yup.string().required(),
            ipAddr: yup.string().required(),
            username: yup.string(),
            password: yup.string()
          })
          .required()
      })
    )
    .required()
});

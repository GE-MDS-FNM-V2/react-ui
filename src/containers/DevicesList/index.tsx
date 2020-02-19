import DevicesList from "../../components/DevicesList";
import { selectAndInitDevice } from "../../store/devices/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export const DevicesListContainer = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);

  return (
    <DevicesList
      devicesState={devices}
      selectDevice={id => dispatch(selectAndInitDevice(id))}
    />
  );
};

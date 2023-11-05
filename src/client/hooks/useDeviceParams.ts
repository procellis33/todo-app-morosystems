import { useEffect, useState } from "react";

interface TDeviceParams {
  width: number;
  height: number;
}

const useDeviceParams = (): TDeviceParams => {
  const [deviceParams, setDeviceParams] = useState<TDeviceParams>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  useEffect(() => {
    const handleResize = (): void => {
      setDeviceParams({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceParams;
};

export default useDeviceParams;

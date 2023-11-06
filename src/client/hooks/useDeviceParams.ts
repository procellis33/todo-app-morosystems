import { useEffect, useState } from "react";

interface IDeviceParams {
  width: number;
  height: number;
}

// * Creating custom hook to use device width and height easier
const useDeviceParams = (): IDeviceParams => {
  const [deviceParams, setDeviceParams] = useState<IDeviceParams>({
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

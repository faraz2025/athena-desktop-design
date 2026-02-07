import { useEffect, useState } from 'react';

export type DeviceType = "mobile" | "tablet" | "desktop";

export const useMobileDetect = () => {
  const deviceType = useDeviceType();
  return deviceType !== "desktop";
};

export const useDeviceType = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;

      let deviceType: DeviceType;

      if ((width >= 640 && width <= 1024)) {
        deviceType = "tablet";
      } else if (width < 640) {
        deviceType = "mobile";
      } else {
        deviceType = "desktop";
      }

      setDevice(deviceType);
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);

    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  return device;
};


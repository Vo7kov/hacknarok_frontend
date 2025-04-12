import { createContext, useContext, useState } from 'react';

type CameraContextType = {
  cameraActive: boolean;
  setCameraActive: (value: boolean) => void;
};

const CameraContext = createContext<CameraContextType>({
  cameraActive: false,
  setCameraActive: () => {},
});

export const useCameraContext = () => useContext(CameraContext);

export const CameraProvider = ({ children }: { children: React.ReactNode }) => {
  const [cameraActive, setCameraActive] = useState(false);

  return (
    <CameraContext.Provider value={{ cameraActive, setCameraActive }}>
      {children}
    </CameraContext.Provider>
  );
};

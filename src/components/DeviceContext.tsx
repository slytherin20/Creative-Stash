import { createContext } from "react";

const DeviceContext = createContext({
    isMobile:false,
    isTablet:false
});

export default DeviceContext;

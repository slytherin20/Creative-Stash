"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContext = void 0;
var auth_1 = require("firebase/auth");
var firebase_config_js_1 = require("../firebase_config.js");
var react_1 = require("react");
var AdminPortal_jsx_1 = require("./Admin/AdminPortal.jsx");
var Consumer_jsx_1 = require("./Consumer.jsx");
var react_responsive_1 = require("react-responsive");
var DeviceContext_jsx_1 = require("./DeviceContext.jsx");
exports.AuthContext = (0, react_1.createContext)(undefined);
function App() {
    var _a = (0, react_1.useState)(undefined), user = _a[0], setUser = _a[1];
    var isMobile = (0, react_responsive_1.useMediaQuery)({ query: "(max-width:480px)" });
    var isTablet = (0, react_responsive_1.useMediaQuery)({ query: "(max-width:1224px)" });
    (0, auth_1.onAuthStateChanged)(firebase_config_js_1.auth, function (user) {
        if (user) {
            firebase_config_js_1.auth.currentUser
                .getIdToken()
                .then(function (idtoken) {
                sessionStorage.setItem("tokenId", idtoken);
                setUser(user.uid);
            })
                .catch(function (err) {
                console.log("Error fetching authentication token", err);
            });
        }
        else
            setUser(null);
    });
    function checkIfAdmin() {
        if (user) {
            if (user === process.env.REACT_APP_ADMIN_UID) {
                return true;
            }
            return false;
        }
        else if (user === null)
            return false;
        else
            return false;
    }
    return checkIfAdmin() ? (<AdminPortal_jsx_1.default userid={user}/>) : (<DeviceContext_jsx_1.default.Provider value={{ isMobile: isMobile, isTablet: isTablet }}>
      <exports.AuthContext.Provider value={user}>
        <Consumer_jsx_1.default />
      </exports.AuthContext.Provider>
    </DeviceContext_jsx_1.default.Provider>);
}
exports.default = App;

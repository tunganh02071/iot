// library
import { useCookies } from "react-cookie";
import _ from "lodash";

const useAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies([
        "username",
        "email",
        "accessToken",
        "role",
        "id",
    ]);

    const authData = {
        username: cookies.username,
        email: cookies.email,
        accessToken: cookies.accessToken,
        role: cookies.role,
        id: cookies.id,
    };

    const isLoggedIn =
        !_.isNil(authData.username) &&
        !_.isNil(authData.email) &&
        !_.isNil(authData.accessToken);

    const isLoggedAdmin =
        !_.isNil(authData.username) &&
        !_.isNil(authData.email) &&
        !_.isNil(authData.accessToken) &&
        !_.isNil(authData.role);

    const setAuth = (data) => {
        setCookie("username", data.username);
        setCookie("email", data.email);
        setCookie("accessToken", data.accessToken);
        setCookie("role", data.role);
        setCookie("id", data.id);
    };

    const clearAuth = () => {
        removeCookie("username");
        removeCookie("email");
        removeCookie("accessToken");
        removeCookie("role");
        removeCookie("id");
    };

    return {
        isLoggedIn,
        isLoggedAdmin,
        authData,
        setAuth,
        clearAuth,
    };
};

export default useAuth;

import axios from "axios";

export const register = async (data, alert, navigate) => {
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data);
    console.log(result.data.data);
    alert.fire({
      title: "Success",
      text: `${result.data.message}`,
      icon: "Success",
    });
    navigate("/");
  } catch (error) {
    if (error.response.status === 403) {
      alert.fire({
        title: "Error",
        text: `${error.response.data.message}`,
        icon: "errror",
      });
    } else {
      alert.fire({
        title: "Error",
        text: `Error Network`,
        icon: "errror",
      });
    }
  }
};

export const login = (data, alert, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
    const user = result.data.data;
    localStorage.setItem("token", user.token);
    localStorage.setItem("id", user.id);
    // localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: { user } });
    alert.fire({
      title: "Welcome",
      text: `${user.name}`,
      icon: "Success",
    });
    navigate("/home");
  } catch (error) {
    console.log(error);
    if (error.response.status === 403) {
      alert.fire({
        title: "Error",
        text: `${error.response.data.message}`,
        icon: "errror",
      });
    } else {
      alert.fire({
        title: "Error",
        text: `Error Network`,
        icon: "errror",
      });
    }
  }
};

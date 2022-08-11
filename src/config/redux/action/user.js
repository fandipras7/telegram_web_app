import axios from "axios";

export const getListContact = (search) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    dispatch({ type: "GET_LISTCONTACT_PENDING" });
    console.log("apakah dispatch jalan");
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/listUser?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("apakah dispatch seteleah get data jalan");
    // console.log(result);
    const users = result.data.data;
    console.log(users);
    dispatch({ type: "GET_ALL_USERS", payload: users });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    // console.log(token);
    dispatch({ type: "GET_PROFILE_PENDING" });
    console.log("apakah dispatch jalan");
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(result);
    const profile = result.data.data;
    // console.log(profile);
    dispatch({ type: "GET_PROFILE_SUCCESS", payload: profile });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (data, alert) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateAva = async (data) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios
      .put(`${process.env.REACT_APP_API_URL}/users/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

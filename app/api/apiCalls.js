import axios from "axios";

export const PostApiCall = async (endPoint, data) => {
  try {
    const response = await axios.post(
      `http://localhost:1337/api/${endPoint}`,
      data,
      {
        headers: {
          Authorization: `Bearer 97283c93b3263a7af733c1356b4a3d4d08dd5924d82926502ce67e6f3eb245f211d36bb63270fc1b78902d5199f8c312e8053d7b838e8171b2e9c81ea9a9854ee0cf44823bd3600f30ec670c60edf9aba63a47018a2bfbc4af810e384b9aba3b9ab688ebaf6b0f4c9cb985db8144f1ce98f012b82320d6b24512734354b18b9b`,
        },
      }
    );
    return {
      response: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error("Request failed:", error.response || error.message);
    return error?.response?.status;
  }
};

export const UpdateApiCall = async (endPoint, data) => {
  try {
    const response = await axios.put(
      `http://localhost:1337/api/${endPoint}`,
      data,
      {
        headers: {
          Authorization: `Bearer 97283c93b3263a7af733c1356b4a3d4d08dd5924d82926502ce67e6f3eb245f211d36bb63270fc1b78902d5199f8c312e8053d7b838e8171b2e9c81ea9a9854ee0cf44823bd3600f30ec670c60edf9aba63a47018a2bfbc4af810e384b9aba3b9ab688ebaf6b0f4c9cb985db8144f1ce98f012b82320d6b24512734354b18b9b`,
        },
      }
    );
    return {
      response: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error("Request failed:", error.response || error.message);
    return error?.response?.status;
  }
};

export const GetApiCall = async (endPoint) => {
  try {
    const response = await axios.get(`http://localhost:1337/api/${endPoint}`, {
      headers: {
        Authorization: `Bearer 97283c93b3263a7af733c1356b4a3d4d08dd5924d82926502ce67e6f3eb245f211d36bb63270fc1b78902d5199f8c312e8053d7b838e8171b2e9c81ea9a9854ee0cf44823bd3600f30ec670c60edf9aba63a47018a2bfbc4af810e384b9aba3b9ab688ebaf6b0f4c9cb985db8144f1ce98f012b82320d6b24512734354b18b9b`,
      },
    });
    return {
      ...response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error("Request failed:", error.response || error.message);
    return error?.response?.status;
  }
};

export const PostMedia = async (endPoint, ImageFile, userId) => {
  try {
    const formData = new FormData();
    formData.append("files", ImageFile);
    formData.append("ref", "plugin::users-permissions.user");
    formData.append("refId", userId);
    formData.append("field", "photo");
    formData.append("source", "users-permissions");
    const response = await axios({
      method: "post",
      url: `http://localhost:1337/api/${endPoint}`, // Change this to the actual URL provided by your CMS.
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer 97283c93b3263a7af733c1356b4a3d4d08dd5924d82926502ce67e6f3eb245f211d36bb63270fc1b78902d5199f8c312e8053d7b838e8171b2e9c81ea9a9854ee0cf44823bd3600f30ec670c60edf9aba63a47018a2bfbc4af810e384b9aba3b9ab688ebaf6b0f4c9cb985db8144f1ce98f012b82320d6b24512734354b18b9b`, // Make sure you have the token variable available
      },
    });
    return {
      response: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error("Request failed:", error.response || error.message);
    return error?.response?.status;
  }
};

'use server'
import axios from "axios";
export const PostApiCall = async (endPoint, data, token) => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/api/${endPoint}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const UpdateApiCall = async (endPoint, data, token) => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/api/${endPoint}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const GetApiCall = async (endPoint, token) => {
  try {
    const response = await axios.get(`${process.env.HOSTNAME}/api/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const PostMedia = async (endPoint, ImageFile, userId, token) => {
  try {
    const formData = new FormData();
    formData.append("files", ImageFile);
    formData.append("ref", "plugin::users-permissions.user");
    formData.append("refId", userId);
    formData.append("field", "photo");
    formData.append("source", "users-permissions");
    const response = await axios({
      method: "post",
      url: `${HOSTNAME}/api/${endPoint}`, // Change this to the actual URL provided by your CMS.
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Make sure you have the token variable available
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

export const DeleteMedia = async (endPoint, token) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${HOSTNAME}/api/${endPoint}`,
      headers: {
        Authorization: `Bearer ${token}`, // Make sure you have the token variable available
      },
    });
    return response;
  } catch (error) {
    console.error("Request failed:", error.response || error.message);
    return error?.response?.status;
  }
};

export const SendingEmail = async (endPoint, token) => {
  debugger;
  try {
    const response = await axios({
      method: "post",
      url: `${HOSTNAME}/api/${endPoint}`,
      headers: {
        Authorization: `Bearer ${token}`, // Make sure you have the token variable available
      },
    });
    return response;
  } catch (error) {
    console.error("Request failed:", error.response || error.message);
    return error?.response?.status;
  }
};

export async function getTimezone(latitude, longitude) {
  const apiKey = process.env.GOOGLE_MAPS_KEY; // Replace with your Google API key
  debugger
  const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${
    Date.now() / 1000
  }&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const timezoneId = response?.data?.timeZoneId;
    return timezoneId;
  } catch (error) {
    console.error("Error fetching timezone:", error);
    return null;
  }
}

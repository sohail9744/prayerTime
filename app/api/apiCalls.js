import axios from "axios";
import moment from "moment";
export const PostApiCall = async (endPoint, data, token) => {
  try {
    const response = await axios.post(
      `${process.env.HOSTNAME}/api/${endPoint}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Make sure you have the token variable available
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
      `${process.env.HOSTNAME}/api/${endPoint}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
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
    const response = await axios.get(
      `${process.env.HOSTNAME}/api/${endPoint}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
      url: `${process.env.HOSTNAME}/api/${endPoint}`, // Change this to the actual URL provided by your CMS.
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
      url: `${process.env.HOSTNAME}/api/${endPoint}`,
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
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.HOSTNAME}/api/${endPoint}`,
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

export async function getTimezone(lat, lng) {
  const apiKey = process.env.TIMEZONE_DB; // Replace with your Google API key
  const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;

  try {
    const response = await axios.get(apiUrl);
    return{
      zone: response?.data?.zoneName,
      city: response?.data?.cityName
    }
  } catch (error) {
    console.error("Error fetching timezone:", error);
    return null;
  }
}
export async function getTemperature(latitude, longitude) {
  const currDate = moment().format("YYYY-MM-DD");
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&start_date=${currDate}&end_date=${currDate}`;
  try {
    const response = await axios.get(apiUrl);
    const temperature = response?.data?.daily?.temperature_2m_max[0];
    return temperature;
  } catch (error) {
    console.error("Error fetching timezone:", error);
    return null;
  }
}

export const GetThemeDataCall = async (endPoint) => {
  try {
    const response = await axios.get(
      `${process.env.HOSTNAME}/api/${endPoint}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
        },
      }
    );
    return {
      ...response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error("Request failed:", error.response || error.message);
    return error?.response?.status;
  }
};

import axios from "axios";

const useApi = () => {
  const request = async (method, url, payload, options) => {
    const config = {
      method,
      url,
      headers: options?.headers || {},
      withCredentials: true, // Ensures cookies are included in cross-origin requests
    };

    if (method === "get" || method === "delete") {
      config.params = options?.params;
    } else {
      config.data = payload;
    }

    try {
      const response = await axios.request(config);
      console.log("Response:", response);
      return response.data;
    } catch (err) {
      console.log("Error:", err);
      const status = err.response?.status;
      let errorMessage = "Something went wrong";

      switch (status) {
        case 400:
          errorMessage =
            err.response?.data?.message ||
            "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Not authenticated. Please login.";
          break;
        case 403:
          errorMessage =
            "Forbidden. You don't have permission for this action.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 409:
          errorMessage = err.response?.data?.message || "Conflict occurred.";
          break;
        case 422:
          errorMessage =
            err.response?.data?.message ||
            "Validation failed. Please check your input.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          } else if (err.message) {
            errorMessage = err.message;
          }
      }

      console.error(
        `API Error [${status}]: ${errorMessage}`,
        err.response?.data
      );

      throw {
        message: errorMessage,
        status,
        data: err.response?.data,
        isAxiosError: true,
      };
    }
  };

  const enhancedPost = async (url, payload, options) => {
    const response = await request("post", url, payload, options);
    return response;
  };

  return {
    get: (url, options) => request("get", url, null, options),
    post: enhancedPost,
    put: (url, payload, options) => request("put", url, payload, options),
    patch: (url, payload, options) => request("patch", url, payload, options),
    del: (url, options) => request("delete", url, null, options),
  };
};

export default useApi;

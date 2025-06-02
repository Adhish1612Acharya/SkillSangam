import { handleAxiosError } from "@/utils/handleAxiosError";
import useApi from "./useApi";

const useOfficer = () => {
  const { post } = useApi();

  const login = async (formData) => {
    try {
      const payload = {
        username: formData.username || formData.email,
        password: formData.password,
      };
      const response = await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/officer/login`,
        payload
      );
      return response;
    } catch (err) {
      console.error("Error in officer login:", err);
      handleAxiosError(err);
    }
  };

  return { login };
};

export default useOfficer;

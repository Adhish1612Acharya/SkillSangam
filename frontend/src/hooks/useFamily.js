import { handleAxiosError } from "@/utils/handleAxiosError";
import useApi from "./useApi";

const useFamily = () => {
  const { post } = useApi();

  const signUp = async (formData) => {
    try {
      const payload = {
        fullName: formData.fullName,
        adhaarNumber: formData.adhaarNumber,
        familyCode: formData.familyCode,
        password: formData.password,
        email: formData.email,
        username: formData.username,
        relationship: formData.relationship, // Optional field for relationship
      };
      await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/family/signup`,
        payload
      );
    } catch (err) {
      console.error("Error in signUp:", err);
      handleAxiosError(err);
    }
  };

  const login = async (formData) => {
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };
      await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/family/login`,
        payload
      );
    } catch (err) {
      console.error("Error in login:", err);
      handleAxiosError(err);
    }
  };

  return { signUp, login };
};

export default useFamily;

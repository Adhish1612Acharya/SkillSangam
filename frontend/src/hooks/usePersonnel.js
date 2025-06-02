import { handleAxiosError } from "@/utils/handleAxiosError";
import useApi from "./useApi";

const usePersonnel = () => {
  const { post } = useApi();

  const signUp = async (formData) => {
    try {

        console.log("Form data in signUp:", formData);
      const payload = {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        serviceNumber: formData.serviceNumber,
        rank: formData.rank,
        unitOrRegiment: formData.unit,
        joinDate: formData.joiningDate,
        family: {
          fullName: formData.familyFullName,
          adhaarNumber: formData.familyAdhaarNumber,
        },
      };

      console.log("Payload for signUp:", payload);
      const response = await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/personnel/signup`,
        payload
      );

      return response;
    } catch (err) {
      console.error("Error in signUp:", err);
      handleAxiosError(err);
    }
  };

  const login = async (formData) => {
    try {
      const payload = {
        username: formData.username || formData.email,
        password: formData.password,
      };
      const response = await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/personnel/login`,
        payload
      );
      return response;
    } catch (err) {
      console.error("Error in login:", err);
      handleAxiosError(err);
    }
  };

  return { signUp, login };
};

export default usePersonnel;

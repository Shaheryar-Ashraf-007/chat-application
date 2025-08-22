import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // No retry on auth check
  });

  return {
    isLoading: authUser.isLoading,
    error: authUser.error,
    authUser: authUser.data?.user || null, // Ensure you're accessing the correct structure
  };
};

export default useAuthUser;
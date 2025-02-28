import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const useTasks = () => {
  const { user } = useContext(AuthContext);
  const api_url = import.meta.env.VITE_API_URL;


  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.email], // Depend on user.email
    queryFn: async () => {
      if (!user?.email) return []; // Prevent API call when user is null
      const { data } = await axios.get(`${api_url}/tasks/${user.email}`);
      console.log("Fetched Data:", data);
      return Array.isArray(data) ? data : []; // Ensure it's always an array
    },
    enabled: !!user?.email, // Only fetch if user.email exists
  });

  return [tasks, isLoading, refetch];
};

export default useTasks;

import { useEffect, useState } from "react";
import { useAuthStore } from "./useAuthState";

export interface Appt {
  customerName: string;
  service: string;
  date: string;
  timeSlot: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  phone: string;
  email: string;
  description: string;
}

const fetchAppts = () => {
  const [appointments, setAppointments] = useState<Appt[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://elite-manager.onrender.com/api/appointments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.status === 401) {
          throw new Error("Your session has expired.");
        }

        if (!response.ok) {
          throw new Error("Unsuccessful operation.");
        }

        const appts = await response.json();
        setAppointments(appts);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated]);

  return { appointments, error, isLoading };
};

export default fetchAppts;

import styles from "../styles/ApptsByDate.module.css";
import { useState } from "react";
import type { Appt } from "../data/fetchAppts";
import formatTime from "../utils/formatTime";
import ApptDescriptionModal from "../components/ApptDescriptionModal";

const ApptsByDate = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [noApptsMessage, setNoApptsMessage] = useState("");
  const [appts, setAppts] = useState<Appt[] | null>(null);
  const [activeDescription, setActiveDescription] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);

    setAppts(null);
    setError("");
    setNoApptsMessage("");
    setIsLoading(true);

    const dateJson = JSON.stringify({ date: e.target.value });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointments/date`,
        {
          method: "POST",
          body: dateJson,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        setError("Couldn't fetch appointments.");
        return;
      }

      const data = await response.json();

      if (data.appointments) {
        const apptsArray = Object.entries(data.appointments).map(
          ([key, value]) => ({
            id: key,
            ...(value as Appt),
          }),
        );
        setAppts(apptsArray);
      } else if (!data.appointments && data.success) {
        setNoApptsMessage("No appointments on that day!");
      }

      if (data.error) {
        setError(data.error);
        return;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["page"]}>
      <h1 className={styles["header"]}>Appointments by Date</h1>
      <label className={styles["date-label"]}>Choose a date:</label>
      <input
        value={selectedDate}
        className={styles["date-input"]}
        type="date"
        onChange={handleDateChange}
      />
      {appts && (
        <table className={styles.apptsTable}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Service</th>
              <th className={styles["date-column-fields"]}>Date</th>
              <th>Time Slot</th>
              <th>Vehicle Make</th>
              <th>Vehicle Model</th>
              <th>Vehicle Year</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {appts.map((appt, index) => {
              return (
                <tr key={index}>
                  <td>{appt.customerName}</td>
                  <td>{appt.service}</td>
                  <td className={styles["date-column-fields"]}>{appt.date}</td>
                  <td>{formatTime(appt.timeSlot)}</td>
                  <td>{appt.vehicleMake}</td>
                  <td>{appt.vehicleModel}</td>
                  <td>{appt.vehicleYear}</td>
                  <td>{appt.email}</td>
                  <td>{appt.phone}</td>
                  <td className={styles.descTableData}>
                    {appt.description && (
                      <div className={styles.viewDescBtnFlex}>
                        <button
                          className={styles.viewDescBtn}
                          onClick={() => setActiveDescription(appt.description)}
                        >
                          View
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <ApptDescriptionModal
        isOpen={activeDescription != null}
        setIsOpen={(isOpen) => {
          if (!isOpen) setActiveDescription(null);
        }}
        description={activeDescription || ""}
      />
      {noApptsMessage && (
        <p className={styles["no-appts-message"]}>{noApptsMessage}</p>
      )}
      {isLoading && <p>Loading appointments...</p>}
      {error && <p className={styles["error"]}>{error}</p>}
    </div>
  );
};

export default ApptsByDate;

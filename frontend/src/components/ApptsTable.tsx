import styles from "../styles/ApptsTable.module.css";
import { useState } from "react";
import ApptDescriptionModal from "./ApptDescriptionModal";
import formatTime from "../utils/formatTime";
import fetchAppts from "../data/fetchAppts";

const ApptsTable = () => {
  const [activeDescription, setActiveDescription] = useState<string | null>(
    null,
  );
  const { appointments, error, isLoading } = fetchAppts();

  if (isLoading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.mainContainer}>
      <h1>Appointments Table</h1>
      {
        <table className={styles.apptsTable}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Service</th>
              <th>Date</th>
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
            {appointments.map((appt, index) => {
              return (
                <tr key={index}>
                  <td>{appt.customerName}</td>
                  <td>{appt.service}</td>
                  <td>{appt.date}</td>
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
      }

      <ApptDescriptionModal
        isOpen={activeDescription != null}
        setIsOpen={(isOpen) => {
          if (!isOpen) setActiveDescription(null);
        }}
        description={activeDescription || ""}
      />
    </div>
  );
};

export default ApptsTable;

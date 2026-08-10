import { useNavigate } from "react-router";
import styles from "../styles/ServiceCard.module.css";

interface ServiceCardProps {
  heading: string;
  description: string;
  path: string;
}

const ServiceCard = ({ heading, description, path }: ServiceCardProps) => {
  const navigate = useNavigate();
  const isSignoutCard = path === "/signout";
  return (
    <div className={styles["card"]}>
      <h2 className={styles["header"]}>{heading}</h2>
      <p className={styles["description"]}>{description}</p>
      {isSignoutCard ? (
        <button
          className={styles["view-btn"]}
          onClick={() => navigate(path, { replace: true })}
        >
          Sign out
        </button>
      ) : (
        <button className={styles["view-btn"]} onClick={() => navigate(path)}>
          View
        </button>
      )}
    </div>
  );
};

export default ServiceCard;

import styles from "../styles/ApptDescriptionModal.module.css";

interface ApptDescriptionModalProps {
  description: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function ApptDescriptionModal({
  description,
  isOpen,
  setIsOpen,
}: ApptDescriptionModalProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.mainBox}>
          <div className={styles.descriptionBox}>
            <button onClick={() => setIsOpen(false)}>Close</button>
            <h2>Description</h2>
            <p>{description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ApptDescriptionModal;

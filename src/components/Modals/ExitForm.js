import { useRouter } from "next/router";
import classes from "../../styles/Modal.module.css";

const ExitForm = ({ setModalOpen }) => {
  const router = useRouter();
  return (
    <>
      <div className={classes.modal}>
        <p className={classes.modalPrompt}>
          Are you sure you want exit this form? All progress will be lost.
        </p>
        <div className={classes.buttonsBox}>
          <button
            onClick={() => setModalOpen(false)}
            className={classes.cancelBtn}
          >
            Resume editing
          </button>
          <button onClick={() => router.back()} className={classes.confirmBtn}>
            Cancel form
          </button>
        </div>
      </div>
      <div className={classes.bg} />
    </>
  );
};

export default ExitForm;

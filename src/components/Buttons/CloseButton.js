import Close from "@mui/icons-material/Close";
import classes from "../../styles/Buttons.module.css";
const CloseButton = (props) => {
  return (
    <button onClick={props.onClick} className={`${classes.closeBtn} ${props.color === "white" && classes.white}`}>
      <Close sx={{ fontSize: 40 }}/>
    </button>
  );
};

export default CloseButton;

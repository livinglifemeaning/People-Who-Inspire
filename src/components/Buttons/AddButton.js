import Add from "@mui/icons-material/Add";
import classes from "../../styles/Buttons.module.css"

const AddButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.btn} ${
        props.color === "yellow" && classes.yellow
      } ${props.color === "white" && classes.white}`}
    >
      <Add />
    </button>
  );
};

export default AddButton;

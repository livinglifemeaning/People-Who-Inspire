import classes from "../../styles/Buttons.module.css";
import Edit from "@mui/icons-material/Edit";

const EditButton = (props) => {
  return (
    <button
      className={`${classes.btn} ${props.color === "white" && classes.white} ${
        props.color === "yellow" && classes.yellow
      }`}
    >
      <Edit />
    </button>
  );
};

export default EditButton;

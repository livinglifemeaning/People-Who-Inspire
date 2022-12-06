import Menu from "@mui/icons-material/Menu"
import classes from "../../styles/Buttons.module.css"
const HamburgerMenu = (props) => {
  return (
    <button onClick={props.onClick} className={classes.hamburgerMenu}>
      <Menu  sx={{ fontSize: 45 }}/>
    </button>
  );
};

export default HamburgerMenu;

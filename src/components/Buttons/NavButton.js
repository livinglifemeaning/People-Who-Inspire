import classes from "../../styles/Buttons.module.css"


const NavButton = (props) => {
  return (
    <button className={classes.navBtn}>{props.children}</button>
  )
}

export default NavButton

import { useBoardContext } from "../../contexts/BoardContext";
import Link from "next/link";
import KeyboardBackSpace from "@mui/icons-material/KeyboardBackspace";
import classes from "../../styles/Buttons.module.css"
const HomeButton = () => {
  const { currentBoard } = useBoardContext();
  return (
    <Link href={`/board/${currentBoard.name.replace(/\s/g, "")}`}>
      <button className={classes.homeBtn}>
        <KeyboardBackSpace />
        Home
      </button>
    </Link>
  );
};

export default HomeButton;

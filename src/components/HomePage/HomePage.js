import { useBoardContext } from "../../contexts/BoardContext";
import useMediaQuery from "../../hooks/useMediaQuery";
import PagesNavigation from "../Navigation/PagesNavigation";
import HomeNavigation from "../Navigation/HomeNavigation";
import classes from "../../styles/HomePage.module.css";

const HomePage = () => {
  const { currentBoard } = useBoardContext();
  const isDesktop = useMediaQuery("(min-width: 45em)");

  return (
    <div className={classes.home}>
      <HomeNavigation />
      <div className={classes.homeContent}>
        <div className={classes.imageBox}>
          <img className={classes.image} src={currentBoard.mainImage} alt="" />
        </div>
        <div className={classes.personInfo}>
          <h1 className={classes.name}>{currentBoard.name}</h1>
          <p
            className={classes.year}
          >{`${currentBoard.yearOfBirth}-${currentBoard.yearOfDeath}`}</p>
        </div>
        {!isDesktop && <PagesNavigation />}
      </div>
      {isDesktop && <PagesNavigation />}
      {/* <button onClick={handleLogout}>Sign out</button> */}
    </div>
  );
};

export default HomePage;

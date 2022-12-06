import { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { useBoardContext } from "../../contexts/BoardContext";
import { navigateToBoard } from "../../firebase/databaseFunctions";
import AddButton from "../Buttons/AddButton";
import CloseButton from "../Buttons/CloseButton";
import EditButton from "../Buttons/EditButton";
import HamburgerMenu from "../Buttons/HamburgerMenu";
import classes from "../../styles/HomeNavigation.module.css";

const NavModal = ({ setNavOpen, handleLogout }) => {
  return (
    <>
      <div className={classes.navModal}>
        <div className={classes.topModal}>
          <CloseButton color="white" onClick={() => setNavOpen(false)} />
          <Link href="/form/EditBoard">
            <div className={classes.editBtn}>
              <EditButton color="white" />
              <p>edit board</p>
            </div>
          </Link>
        </div>
        <div className={classes.settingsBox}>
          <Link href="/AccountSettings">
            <p className={classes.settings}>Account settings</p>
          </Link>
          <p onClick={handleLogout} className={classes.signout}>
            Sign out
          </p>
        </div>
      </div>
      <div className={classes.blackModal} />
    </>
  );
};

const MobileNav = ({ handleLogout, thumbnailsData, currentUser, router }) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <div className={classes.navBar}>
        <HamburgerMenu onClick={() => setNavOpen((prevState) => !prevState)} />
        <div className={classes.boardsBar}>
          <Link href="/form/AddBoard">
            <AddButton color="yellow" />
          </Link>
          {thumbnailsData.map((board) => {
            return (
              <div
                onClick={() =>
                  navigateToBoard(
                    currentUser.uid,
                    board.boardId,
                    router,
                    board.name
                  )
                }
                key={board.name}
                className={`${classes.boardThumbnail} ${
                  board.color === "white"
                    ? classes.white
                    : board.color === "black"
                    ? classes.black
                    : board.color === "purple"
                    ? classes.purple
                    : board.color === "green"
                    ? classes.green
                    : ""
                }`}
              >
                <img src={board.mainImage} alt={board.name} />
              </div>
            );
          })}
        </div>
      </div>
      {navOpen && (
        <NavModal setNavOpen={setNavOpen} handleLogout={handleLogout} />
      )}
    </>
  );
};

const DesktopNav = ({ handleLogout, thumbnailsData, currentUser, router }) => {
  return (
    <>
      <div className={classes.navBar}>
        <Link href="/form/EditBoard">
          <div className={classes.editBtn}>
            <EditButton color="white" />
            <p>edit board</p>
          </div>
        </Link>
        <Link href="/form/AddBoard">
          <div className={classes.addBtn}>
            <AddButton color="white" />

            <p>add board</p>
          </div>
        </Link>
        <div className={classes.boardsBar}>
          {thumbnailsData.map((board) => {
            return (
              <div
                onClick={() =>
                  navigateToBoard(
                    currentUser.uid,
                    board.boardId,
                    router,
                    board.name
                  )
                }
                key={board.name}
                className={`${classes.boardThumbnail} ${
                  board.color === "white"
                    ? classes.white
                    : board.color === "black"
                    ? classes.black
                    : board.color === "purple"
                    ? classes.purple
                    : board.color === "green"
                    ? classes.green
                    : ""
                }`}
              >
                <img src={board.mainImage} alt={board.name} />
                <p className={classes.boardName}>{board.name.split(" ")[0]}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.settingsBox}>
        <Link href="/AccountSettings">
          <p className={classes.settings}>Account settings</p>
        </Link>
        <p onClick={handleLogout} className={classes.signout}>
          Sign out
        </p>
      </div>
    </>
  );
};
const HomeNavigation = () => {
  const isDesktop = useMediaQuery("(min-width: 45em)");
  const router = useRouter();
  const { signout, currentUser } = useAuth();
  const { thumbnailsData } = useBoardContext();

  const handleLogout = async () => {
    try {
      await signout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.header}>
      <p className={classes.logo}>people who inspire me</p>
      {isDesktop ? (
        <DesktopNav
          handleLogout={handleLogout}
          thumbnailsData={thumbnailsData}
          currentUser={currentUser}
          router={router}
        />
      ) : (
        <MobileNav
          handleLogout={handleLogout}
          thumbnailsData={thumbnailsData}
          currentUser={currentUser}
          router={router}
        />
      )}
    </div>
  );
};

export default HomeNavigation;

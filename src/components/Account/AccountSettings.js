import { useRouter } from "next/router";
import { useBoardContext } from "../../contexts/BoardContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  deleteBoard,
  navigateToEditForm,
  deleteUserData,
} from "../../firebase/databaseFunctions";
import HomeButton from "../Buttons/HomeButton";
import EditButton from "../Buttons/EditButton";
import classes from "../../styles/AccountSettings.module.css";

const AccountSettings = () => {
  const router = useRouter();
  const { boardsData } = useBoardContext();
  const { currentUser, deleteAccount } = useAuth();

  const handleDeleteAccount = () => {
    deleteUserData(currentUser.uid);
    deleteAccount();
  };

  const handleEditBoard = (boardId) => {
    navigateToEditForm(currentUser.uid, boardId, router);
  };

  const handleDeleteBoard = (boardId) => {
    if (boardsData.length > 1) {
      deleteBoard(currentUser.uid, boardId);
    } else {
      alert("You must have at least one board");
    }
  };

  return (
    <div className={classes.accountPage}>
      <HomeButton />
      <h1 className={classes.heading}>Account</h1>
      <h2>Manage boards</h2>
      {boardsData.map((board) => {
        return (
          <div className={classes.manageBoard}>
            <div>
              <img
                className={classes.boardImage}
                src={board.mainImage}
                alt=""
              />
              <p className={classes.boardName}>{board.name}</p>
            </div>
            <div className={classes.manageButtons}>
              <div
                onClick={() => handleEditBoard(board.key)}
                className={`${classes.button}`}
              >
                <EditButton color="white" /> Edit Board
              </div>
              <div
                onClick={() => handleDeleteBoard(board.key)}
                className={`${classes.button} ${classes.delete}`}
              >
                Delete board
              </div>
            </div>
          </div>
        );
      })}

      <h2>Manage Account</h2>
      <p className={classes.warning}>
        Warning! This action cannot be undone and you will lose all your board
        data.
      </p>
      <button onClick={handleDeleteAccount} className={classes.deleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default AccountSettings;

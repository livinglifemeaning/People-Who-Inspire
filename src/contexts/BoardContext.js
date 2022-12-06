import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase/databaseFunctions";
import { ref, onValue } from "firebase/database";
import { useAuth } from "./AuthContext";
import data from "../data/data.json";
const BoardContext = createContext();

export const useBoardContext = () => {
  return useContext(BoardContext);
};

export const BoardProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [boardsData, setBoardsData] = useState(data);
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  console.log(boardsData, value);

  useEffect(() => {
    if (currentUser) {
      const boardsRef = ref(db, `users/${currentUser.uid}/boards`);
      onValue(boardsRef, (snapshot) => {
        const boards = snapshot.val();
        const boardsArray = Object.entries(boards).map(([key, value]) => ({
          key,
          ...value,
        }));
        setBoardsData(boardsArray);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (boardsData.length > 0) {
      const boardsLastOpened = boardsData.sort((a, b) => {
        return b.lastOpened - a.lastOpened;
      });

      // sorts boards by last opened by user

      const currentBoard = boardsLastOpened[0];

      // gets thumbnail data of all other user boards
      const thumbnailsData = [];
      for (let i = 1; i < boardsLastOpened.length; i++) {
        thumbnailsData.push({
          name: boardsLastOpened[i].name,
          color: boardsLastOpened[i].color,
          mainImage: boardsLastOpened[i].mainImage,
          boardId: boardsLastOpened[i].key
        });
      }

      let pageLinks = [];
      if (currentBoard.InspirePage) {
        pageLinks.push("Inspire Me");
      }
      if (currentBoard.GalleryPage) {
        pageLinks.push("Gallery");
      }
      if (currentBoard.VideosPage) {
        pageLinks.push("Videos");
      }
      if (currentBoard.ArticlesPage) {
        pageLinks.push("Articles");
      }
      if (currentBoard.CustomPage) {
        for (let i = 0; i < currentBoard.CustomPages.length; i++) {
          pageLinks.push(currentBoard.CustomPages[i].pageTitle);
        }
      }

      const value = {
        currentBoard,
        pageLinks,
        thumbnailsData,
        boardsData
      };

      const doc = document.firstElementChild;
      doc.setAttribute("data-color-scheme", currentBoard.color);

      setValue(value);
      setIsLoading(false);

      if (currentUser && router.pathname === "/") {
        router.push(`/board/${currentBoard.name.replace(/\s/g, "")}`);
      }
    }
  }, [boardsData]);

  return (
    <BoardContext.Provider value={value}>
      {(!isLoading || router.pathname === "/") && children}
    </BoardContext.Provider>
  );
};

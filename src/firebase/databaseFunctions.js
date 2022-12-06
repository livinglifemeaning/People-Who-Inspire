import { getDatabase, ref, push, update, remove } from "firebase/database";
import app from "./firebase";
import boardsData from "../data/data.json";
export const db = getDatabase(app);

export function writeInitialData(uid) {
  const boardsRef = ref(db, `users/${uid}/boards`);
  for (let i = 0; i < boardsData.length; i++) {
    push(boardsRef, boardsData[i]);
  }
}

export function editBoardData(uid, currentBoardId, updatedBoardData) {
  update(ref(db), {
    [`users/${uid}/boards/${currentBoardId}`]: {
      lastOpened: updatedBoardData.lastOpened,
      name: updatedBoardData.name,
      yearOfBirth: updatedBoardData.yearOfBirth,
      yearOfDeath: updatedBoardData.yearOfDeath,
      pronoun: updatedBoardData.pronoun,
      mainImage: updatedBoardData.mainImage,
      color: updatedBoardData.color,
      GalleryPage: updatedBoardData.GalleryPage,
      GalleryImages: updatedBoardData.GalleryImages
        ? updatedBoardData.GalleryImages
        : null,
      InspirePage: updatedBoardData.InspirePage,
      InspireReasons: updatedBoardData.InspireReasons,
      VideosPage: updatedBoardData.VideosPage,
      VideoLinks: updatedBoardData.VideoLinks
        ? updatedBoardData.VideoLinks
        : null,
      ArticlesPage: updatedBoardData.ArticlesPage,
      ArticleLinks: updatedBoardData.ArticleLinks
        ? updatedBoardData.ArticleLinks
        : null,
      CustomPage: updatedBoardData.CustomPage,
      CustomPages: updatedBoardData.CustomPages
        ? updatedBoardData.CustomPages
        : null,
    },
  });
}

export function addNewBoard(uid, newBoardData) {
  const boardsRef = ref(db, `users/${uid}/boards`);
  push(boardsRef, newBoardData);
}

export function navigateToBoard(uid, selectedBoard, router, name) {
  const today = new Date();
  const timePressed = today.getTime();
  update(ref(db), {
    [`users/${uid}/boards/${selectedBoard}/lastOpened`]: timePressed,
  });
  router.push(`/board/${name.replace(/\s/g, "")}`);
}

export function deleteBoard(uid, boardId) {
  remove(ref(db, `users/${uid}/boards/${boardId}`));
}

export function navigateToEditForm(uid, selectedBoard, router) {
  const today = new Date();
  const timePressed = today.getTime();
  update(ref(db), {
    [`users/${uid}/boards/${selectedBoard}/lastOpened`]: timePressed,
  });

  router.push("/form/EditBoard");
}

export function deleteUserData(uid) {
  remove(ref(db, `users/${uid}`));
}

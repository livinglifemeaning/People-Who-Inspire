import { useBoardContext } from "../../contexts/BoardContext";
import { useAuth } from "../../contexts/AuthContext";
import { useReducer, useState } from "react";
import {
  inputsReducer,
  initialAddBoardInputs,
} from "../../reducers/formsReducer";
import { editBoardData, addNewBoard } from "../../firebase/databaseFunctions";
import { useRouter } from "next/router";

import BasicSettings from "./BasicSettings";
import BoardSettings from "./BoardSettings";
import PagesSettings from "./PagesSettings";
import ExitForm from "../Modals/ExitForm";
import classes from "../../styles/Form.module.css";
import logostyles from "../../styles/Logo.module.css";

const Form = ({ type }) => {
  const router = useRouter();
  const { currentBoard } = useBoardContext();
  const { currentUser } = useAuth();
  const initialEditBoardInputs = {
    currentStep: 1,
    name: currentBoard.name,
    yearOfBirth: currentBoard.yearOfBirth,
    yearOfDeath: currentBoard.yearOfDeath,
    pronoun: currentBoard.pronoun,
    mainImage: currentBoard.mainImage,
    color: currentBoard.color,
    InspirePage: currentBoard.InspirePage,
    InspireReasons: currentBoard.InspireReasons,
    GalleryPage: currentBoard.GalleryPage,
    GalleryImages: currentBoard.GalleryImages
      ? currentBoard.GalleryImages
      : [{ id: "galleryImage1", galleryImage: "" }],
    VideosPage: currentBoard.VideosPage,
    VideoLinks: currentBoard.VideoLinks
      ? currentBoard.VideoLinks
      : [{ id: "video1", videoLink: "" }],
    ArticlesPage: currentBoard.ArticlesPage,
    ArticleLinks: currentBoard.ArticleLinks
      ? currentBoard.ArticleLinks
      : [{ id: "article1", articleLink: "" }],
    CustomPage: currentBoard.CustomPage,
    CustomPages: currentBoard.CustomPages
      ? currentBoard.CustomPages
      : [{ id: "customPage1", pageTitle: "", pageContent: "" }],
  };
  const [modalOpen, setModalOpen] = useState(false);

  const [state, dispatch] = useReducer(
    inputsReducer,
    type === "add" ? initialAddBoardInputs : initialEditBoardInputs
  );

  const nextStep = (e) => {
    e.preventDefault();
    dispatch({ type: "change_step", number: 1 });
  };

  const previousStep = (e) => {
    e.preventDefault();
    dispatch({ type: "change_step", number: -1 });
  };

  const handleGeneralInput = (event) => {
    dispatch({
      type: "change_general_input",
      event,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      state.name === "" ||
      state.pronoun === "" ||
      state.yearOfBirth === "" ||
      state.yearOfDeath === "" ||
      state.color === "" ||
      state.mainImage === ""
    ) {
      alert(
        "Form is incomplete. You must fill out the Name, Pronoun, Year of birth, Year of Death, Main Image, and Board Color fields."
      );
    } else {
      const today = new Date();
      const boardObjectInitial = {
        ...state,
        lastOpened: today.getTime(),
      };
      delete boardObjectInitial.currentStep;
      if (!state.CustomPage) {
        delete boardObjectInitial.CustomPages ;
      }
      if (!state.GalleryPage) {
        delete boardObjectInitial.GalleryImages;
      }
      if (!state.InspirePage) {
        delete boardObjectInitial.InspireReasons;
      }
      if (!state.VideosPage) {
        delete boardObjectInitial.VideoLinks;
      }
      if (!state.ArticlesPage) {
        delete boardObjectInitial.ArticleLinks;
      }

      const boardObject = JSON.parse(JSON.stringify(boardObjectInitial));

      if (type === "edit") {
        console.log(boardObject);
        editBoardData(currentUser.uid, currentBoard.key, boardObject);
        router.push(`/board/${currentBoard.name.replace(/\s/g, "")}`);
      } else if (type === "add") {
        addNewBoard(currentUser.uid, boardObject);
        router.push(`/board/${currentBoard.name.replace(/\s/g, "")}`);
      }
    }
  };

  const addPageContent = (event, objectType, valueType) => {
    event.preventDefault();
    let id = `${valueType}${String(Math.random().toFixed(4)).slice(2, 6)}`;

    dispatch({
      type: "add_page_content",
      objectType,
      id,
      valueType,
    });
  };

  const deletePageContent = (event, objectType, id) => {
    event.preventDefault();
    dispatch({
      type: "delete_page_content",
      objectType,
      id,
    });
  };

  const updatePageContent = (event, objectType, valueType, id) => {
    dispatch({
      type: "update_page_content",
      event,
      objectType,
      valueType,
      id,
    });
  };

  const handleCustomPages = (event, actionType, pageId, valueType) => {
    event.preventDefault();
    dispatch({
      type: "handle_custom_pages",
      actionType,
      pageId,
      valueType,
      event,
    });
  };

  return (
    <>
      <div className={classes.formPage}>
        <p className={`${logostyles.logo} ${logostyles.yellow}`}>
          people who inspire me
        </p>
        <div className={classes.flexHeader}>
          <p>
            {type === "add"
              ? "Add New Tribute Board"
              : `Edit ${currentBoard.name}'s Tribute Board`}
          </p>
          <p onClick={() => setModalOpen(true)} className={classes.cancel}>
            Cancel
          </p>
        </div>
        <h1 className={classes.heading}>
          {state.currentStep === 1
            ? "Basic facts about the person"
            : state.currentStep === 2
            ? "Board Settings"
            : state.currentStep === 3
            ? "Pages Settings"
            : ""}
        </h1>
        <form>
          {state.currentStep === 1 && (
            <BasicSettings
              state={state}
              handleGeneralInput={handleGeneralInput}
              nextStep={nextStep}
            />
          )}

          {state.currentStep === 2 && (
            <BoardSettings
              state={state}
              handleGeneralInput={handleGeneralInput}
              nextStep={nextStep}
              previousStep={previousStep}
            />
          )}

          {state.currentStep === 3 && (
            <PagesSettings
              state={state}
              handleGeneralInput={handleGeneralInput}
              addPageContent={addPageContent}
              deletePageContent={deletePageContent}
              updatePageContent={updatePageContent}
              handleCustomPages={handleCustomPages}
              previousStep={previousStep}
              submitForm={submitForm}
              type={type}
            />
          )}
        </form>
      </div>
      {modalOpen && (
        <ExitForm modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </>
  );
};

export default Form;

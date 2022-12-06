import Delete from "@mui/icons-material/Delete";
import classes from "../../styles/Form.module.css";
import AddButton from "../Buttons/AddButton";

// User Content
const UserContent = ({
  state,
  updatePageContent,
  deletePageContent,
  addPageContent,
  hint,
  objectType,
  valueType,
  addContentInstructions,
}) => {
  return (
    <div>
      <p className={classes.hint}>{hint}</p>
      <div className={classes.userContentBox}>
        {state[objectType].map((el) => {
          return (
            <div key={el.id} className={classes.contentChip}>
              <input
                type="text"
                name={el.id}
                id={el.id}
                value={el[valueType]}
                onChange={(event) =>
                  updatePageContent(event, objectType, valueType, el.id)
                }
              />
              <button
                onClick={(event) => deletePageContent(event, objectType, el.id)}
                className={classes.deleteContentChipBtn}
              >
                <Delete />
              </button>
            </div>
          );
        })}

        <div className={classes.addContentChipBtn}>
          <AddButton
            color="yellow"
            onClick={(event) => addPageContent(event, objectType, valueType)}
          />
          <p>{addContentInstructions}</p>
        </div>
      </div>
    </div>
  );
};

// Custom Page Content
const CustomPageContent = ({ state, handleCustomPages }) => {
  return (
    <div className={classes.userContent}>
      {state.CustomPages.map((page) => {
        const indexOfPage = state.CustomPages.findIndex(
          (item) => item.id === page.id
        );
        return (
          <div key={page.id} className={classes.customPageInputs}>
            <div className={classes.customPageTitle}>
              <label htmlFor={`${page.id}Title`}>
                Title of custom page #{indexOfPage + 1}
              </label>
              <input
                className={classes.textInput}
                type="text"
                name={`${page.id}Title`}
                id={`${page.id}Title`}
                value={state.CustomPages[indexOfPage].pageTitle}
                onChange={(event) =>
                  handleCustomPages(event, "update", page.id, "pageTitle")
                }
              />
            </div>

            <div className={classes.customPageContent}>
              <label htmlFor={`${page.id}Content`}>
                Content of custom page #{indexOfPage + 1}
              </label>
              <textarea
                name={`${page.id}Content`}
                id={`${page.id}Content`}
                value={state.CustomPages[indexOfPage].pageContent}
                onChange={(event) =>
                  handleCustomPages(event, "update", page.id, "pageContent")
                }
              />
            </div>

            <button
              onClick={(event) => handleCustomPages(event, "delete", page.id)}
              className={classes.deleteCustomPage}
            >
              Delete custom page #{indexOfPage + 1}
            </button>
          </div>
        );
      })}

      <div className={classes.addContentChipBtn}>
        <AddButton
          color="yellow"
          onClick={(event) => handleCustomPages(event, "add")}
        />
        <p>Add custom page</p>
      </div>
    </div>
  );
};
// Page Checkbox
const PageCheck = ({
  state,
  handleGeneralInput,
  addPageContent,
  deletePageContent,
  updatePageContent,
  handleCustomPages,
  pageType,
  pageName,
  hint,
  objectType,
  valueType,
  addContentInstructions,
  CustomPage,
}) => {
  return (
    <div className={classes.pageInput}>
      <div className={classes.pageCheckbox}>
        <input
          onChange={handleGeneralInput}
          checked={state[pageType]}
          id={pageType}
          type="checkbox"
          name={pageType}
        />
        <label htmlFor={pageType}>{pageName} Page</label>
      </div>
      {state[pageType] && !CustomPage && (
        <UserContent
          state={state}
          addPageContent={addPageContent}
          deletePageContent={deletePageContent}
          updatePageContent={updatePageContent}
          hint={hint}
          objectType={objectType}
          valueType={valueType}
          addContentInstructions={addContentInstructions}
        />
      )}

      {state[pageType] && CustomPage && (
        <CustomPageContent
          state={state}
          handleCustomPages={handleCustomPages}
        />
      )}
    </div>
  );
};

// Form Section
const PagesSettings = ({
  state,
  previousStep,
  submitForm,
  handleGeneralInput,
  addPageContent,
  deletePageContent,
  updatePageContent,
  handleCustomPages,
  type,
}) => {
  return (
    <div className={classes.formSection}>
      <PageCheck
        state={state}
        handleGeneralInput={handleGeneralInput}
        addPageContent={addPageContent}
        deletePageContent={deletePageContent}
        updatePageContent={updatePageContent}
        pageType="InspirePage"
        pageName="Inspire Me"
        hint="This person inspires me because they..."
        objectType="InspireReasons"
        valueType="reason"
        addContentInstructions="Add reason"
      />

      <PageCheck
        state={state}
        handleGeneralInput={handleGeneralInput}
        addPageContent={addPageContent}
        deletePageContent={deletePageContent}
        updatePageContent={updatePageContent}
        pageType="GalleryPage"
        pageName="Gallery"
        hint="Upload images of this person using the image url"
        objectType="GalleryImages"
        valueType="galleryImage"
        addContentInstructions="Add image"
      />

      <PageCheck
        state={state}
        handleGeneralInput={handleGeneralInput}
        addPageContent={addPageContent}
        deletePageContent={deletePageContent}
        updatePageContent={updatePageContent}
        pageType="VideosPage"
        pageName="Videos"
        hint="Upload videos of this person using the YouTube link"
        objectType="VideoLinks"
        valueType="videoLink"
        addContentInstructions="Add video"
      />

      <PageCheck
        state={state}
        handleGeneralInput={handleGeneralInput}
        addPageContent={addPageContent}
        deletePageContent={deletePageContent}
        updatePageContent={updatePageContent}
        pageType="ArticlesPage"
        pageName="Articles"
        hint="Upload articles about this person using the page link"
        objectType="ArticleLinks"
        valueType="articleLink"
        addContentInstructions="Add article"
      />

      <PageCheck
        state={state}
        handleGeneralInput={handleGeneralInput}
        addPageContent={addPageContent}
        deletePageContent={deletePageContent}
        updatePageContent={updatePageContent}
        handleCustomPages={handleCustomPages}
        pageType="CustomPage"
        pageName="Custom"
        objectType="CustomPages"
        CustomPage={true}
      />

      <div className={classes.buttonsBox}>
        <button className={classes.stepBtn} onClick={(e) => previousStep(e)}>
          Previous step
        </button>
        <button className={classes.addBoard} onClick={(e) => submitForm(e)}>
          {type === "edit" ? "Edit board" : "Add board"}
        </button>
      </div>
    </div>
  );
};

export default PagesSettings;

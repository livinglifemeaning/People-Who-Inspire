export function inputsReducer(state, action) {
  switch (action.type) {
    case "change_step": {
      return {
        ...state,
        currentStep: state.currentStep + action.number,
      };
    }
    case "change_general_input": {
      const inputName = action.event.target.name;
      let inputValue;
      action.event.target.type === "checkbox"
        ? (inputValue = action.event.target.checked)
        : (inputValue = action.event.target.value);
      console.log(inputName, inputValue);

      return {
        ...state,
        [inputName]: inputValue,
      };
    }

    case "add_page_content": {
      console.log(state[action.objectType]);
      return {
        ...state,
        [action.objectType]: [
          ...state[action.objectType],
          { id: action.id, [action.valueType]: "" },
        ],
      };
    }

    case "delete_page_content": {
      let newContent = state[action.objectType].filter(
        (item) => item.id !== action.id
      );

      console.log(newContent);
      return {
        ...state,
        [action.objectType]: newContent,
      };
    }

    case "update_page_content": {
      console.log(state[action.objectType]);
      const newContent = state[action.objectType].map((obj) => {
        if (obj.id === action.id) {
          return {
            ...obj,
            [action.valueType]: action.event.target.value,
          };
        }

        return obj;
      });

      return {
        ...state,
        [action.objectType]: newContent,
      };
    }

    case "handle_custom_pages": {
      console.log(state.CustomPages);
      if (action.actionType === "add") {
        return {
          ...state,
          CustomPages: [
            ...state.CustomPages,
            {
              id: `customPage${String(Math.random().toFixed(4)).slice(2, 6)}`,
              pageTitle: "",
              pageContent: "",
            },
          ],
        };
      }

      if (action.actionType === "delete") {
        const newCustomPages = state.CustomPages.filter(
          (page) => page.id !== action.pageId
        );
        return {
          ...state,
          CustomPages: newCustomPages,
        };
      }

      if (action.actionType === "update") {
        const newContent = state.CustomPages.map((obj) => {
          if (obj.id === action.pageId) {
            return {
              ...obj,
              [action.valueType]: action.event.target.value,
            };
          }

          return obj;
        });

        return {
          ...state,
          CustomPages: newContent,
        };
      }
    }
  }
}

export const initialAddBoardInputs = {
  currentStep: 1,
  name: "",
  yearOfBirth: "",
  yearOfDeath: "",
  pronoun: "",
  mainImage: "",
  color: "",
  InspirePage: false,
  InspireReasons: [{ id: "reason1", reason: "" }],
  GalleryPage: false,
  GalleryImages: [{ id: "galleryImage1", galleryImage: "" }],
  VideosPage: false,
  VideoLinks: [{ id: "video1", videoLink: "" }],
  ArticlesPage: false,
  ArticleLinks: [{ id: "article1", articleLink: "" }],
  CustomPage: false,
  CustomPages: [{ id: "customPage1", pageTitle: "", pageContent: "" }],
};

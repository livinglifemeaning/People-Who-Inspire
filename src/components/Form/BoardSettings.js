import classes from "../../styles/Form.module.css";

const BoardSettings = ({state, handleGeneralInput, nextStep, previousStep}) => {
  return (
    <div className={classes.formSection}>
      {/* Color Scheme Input */}

      <div>
        <p className={classes.label}>Colors</p>
        <div className={classes.colorRadio}>
          <div className={classes.colorChoice}>
            <input
              type="radio"
              id="white"
              name="color"
              value="white"
              onChange={handleGeneralInput}
              checked={state.color === "white"}
            />
            <label htmlFor="white">White</label>
          </div>

          <div className={classes.colorChoice}>
            <input
              type="radio"
              id="black"
              name="color"
              value="black"
              onChange={handleGeneralInput}
              checked={state.color === "black"}
            />
            <label htmlFor="black">Black</label>
          </div>

          <div className={classes.colorChoice}>
            <input
              type="radio"
              id="Purple"
              name="color"
              value="purple"
              onChange={handleGeneralInput}
              checked={state.color === "purple"}
            />
            <label htmlFor="Purple">Purple</label>
          </div>

          <div className={classes.colorChoice}>
            <input
              type="radio"
              id="green"
              name="color"
              value="green"
              onChange={handleGeneralInput}
              checked={state.color === "green"}
            />
            <label htmlFor="green">Green</label>
          </div>
        </div>
      </div>

      <div className={classes.buttonsBox}>
        <button className={classes.stepBtn} onClick={(e) => previousStep(e)}>
          Previous step
        </button>
        <button className={classes.stepBtn} onClick={(e) => nextStep(e)}>
          Next step
        </button>
      </div>
    </div>
  );
};

export default BoardSettings;

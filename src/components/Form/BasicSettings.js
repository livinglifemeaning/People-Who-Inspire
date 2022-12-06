import classes from "../../styles/Form.module.css";

const BasicSettings = ({ state, handleGeneralInput, nextStep }) => {
  return (
    <div className={classes.formSection}>
      {/* Name */}
      <div className={classes.formInput}>
        <label className={classes.label} htmlFor="name">
          Name
        </label>
        <input
          className={classes.textInput}
          onChange={handleGeneralInput}
          name="name"
          id="name"
          type="text"
          value={state.name}
        />
      </div>

      {/* Birth and Death Year */}
      <div className={classes.formInput}>
        <label className={classes.label} htmlFor="yearOfBirth">
          Year of birth
        </label>
        <input
          className={classes.textInput}
          onChange={handleGeneralInput}
          id="yearOfBirth"
          type="text"
          name="yearOfBirth"
          value={state.yearOfBirth}
        />
      </div>

      <div className={classes.formInput}>
        <label className={classes.label} htmlFor="yearOfDeath">
          Year of death
        </label>
        <input
          className={classes.textInput}
          onChange={handleGeneralInput}
          id="yearOfDeath"
          type="text"
          name="yearOfDeath"
          value={state.yearOfDeath}
        />
      </div>

      {/* Pronoun Choices */}

      <div className={classes.formInput}>
        <p className={classes.label}>Pronouns</p>
        <div className={classes.pronounChoice}>
          <input
            type="radio"
            id="male"
            name="pronoun"
            value="male"
            onChange={handleGeneralInput}
            checked={state.pronoun === "male"}
          />
          <label htmlFor="male">He/him</label>
        </div>
        <div className={classes.pronounChoice}>
          <input
            type="radio"
            id="female"
            name="pronoun"
            value="female"
            onChange={handleGeneralInput}
            checked={state.pronoun === "female"}
          />
          <label htmlFor="female">She/her</label>
        </div>

        <div className={classes.pronounChoice}>
          <input
            type="radio"
            id="they"
            name="pronoun"
            value="they"
            onChange={handleGeneralInput}
            checked={state.pronoun === "they"}
          />
          <label htmlFor="they">They/them</label>
        </div>
      </div>

      <div className={classes.formInput}>
        <label className={classes.label} htmlFor="mainImage">
          Main image address
        </label>
        <input
          className={classes.textInput}
          onChange={handleGeneralInput}
          id="mainImage"
          type="text"
          name="mainImage"
          value={state.mainImage}
        />
      </div>

      <div className={classes.oneBtnBar}>
        <button className={classes.stepBtn} onClick={(e) => nextStep(e)}>
          Next step
        </button>
      </div>
    </div>
  );
};

export default BasicSettings;

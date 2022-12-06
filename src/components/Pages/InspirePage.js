import { useBoardContext } from "../../contexts/BoardContext";
import { useRef } from "react";
import PageLayout from "./PageLayout";
import Draggable from "react-draggable";
import classes from "../../styles/Pages.module.css";

const InspireReasons = ({ currentBoard }) => {
  const draggableRef = useRef({});
  const reasonsArray = currentBoard.InspireReasons;
  const reasons = [];
  const generateStyles = () => {
    const styles = {
      position: "absolute",
      fontSize: "",
      top: "",
      left: "",
      fontWeight: "",
      cursor: "pointer",
      userSelect: "none",
    };
    styles.fontSize = `${(1 + Math.random()).toFixed(2)}rem`;
    styles.top = `${Math.floor(Math.random() * (90 - 5 + 1)) + 5}%`;
    styles.left = `${Math.floor(Math.random() * (80 - 1 + 1)) + 1}%`;
    styles.fontWeight = `${Math.round(Math.random()) === 1 ? 400 : 600}`;
    return styles;
  };

  for (let i = 0; i < reasonsArray.length; i++) {
    const styles = generateStyles();
    reasons.push({
      styles,
      text: reasonsArray[i].reason,
      id: reasonsArray[i].id,
    });
  }

  return reasons.map((reason, i) => {
    return (
      <Draggable
        key={reason.id}
        position={null}
        nodeRef={draggableRef.current[i]}
      >
        <p
          ref={(element) => (draggableRef.current[i] = element)}
          className={`${classes.reason} ${
            i % 2 === 0 ? classes.primary : classes.secondary
          }`}
          style={{ ...reason.styles }}
        >
          {reason.text}
        </p>
      </Draggable>
    );
  });
};

const InspirePage = () => {
  const { currentBoard } = useBoardContext();
  return (
    <PageLayout>
      <h1 className={classes.inspireHeading}>
        {currentBoard.name} inspires me because{" "}
        {currentBoard.pronoun === "male"
          ? "he"
          : currentBoard.pronoun === "female"
          ? "she"
          : currentBoard.pronoun === "they"
          ? "they"
          : ""}
        ...
      </h1>
      <div className={classes.inspireBox}>
        <InspireReasons currentBoard={currentBoard} />
      </div>
    </PageLayout>
  );
};

export default InspirePage;

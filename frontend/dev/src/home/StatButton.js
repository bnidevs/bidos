import { useState } from "react";

const StatButton = ({ onClickHandler }) => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked(!clicked);
    onClickHandler();
  };

  return (
    <div
      style={{
        height: 50,
        width: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "dodgerblue",
        borderRadius: 7,
        marginTop: 50,
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`clickable ${hover ? "shadow" : ""}`}
      onClick={onClick}
    >
      <p style={{ fontSize: 15 }}>{clicked ? "Hide Stats" : "Show Stats"}</p>
    </div>
  );
};

export default StatButton;

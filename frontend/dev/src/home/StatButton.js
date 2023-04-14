import { useState } from "react";

const StatButton = ({ onClickHandler }) => {
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked(!clicked);
    onClickHandler();
  };

  return (
    <div className={`stats-button clickable`} onClick={onClick}>
      <p style={{ fontSize: 15 }}>{clicked ? "Hide Stats" : "Show Stats"}</p>
    </div>
  );
};

export default StatButton;

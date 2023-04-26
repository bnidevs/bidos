const Commits = ({ author, time, title, hideBottomBorder }) => {
  return (
    <div
      className="clickable commit"
      style={{
        borderWidth: hideBottomBorder ? 0.5 : 0, //hdieBottomBorder will be true only for the last commit item being rendered
      }}
      onClick={() =>
        window.open(
          "https://github.com/bnidevs/bidos/commit/ee32e5cdde9e5de00a969625d2d5a3cb501bfb4b",
          "_blank"
        )
      }
    >
      <img
        src="https://avatars.githubusercontent.com/u/37488506?v=4"
        className="commit-profile-image"
      />
      <p style={{ fontSize: 10 }}>{title}</p>
    </div>
  );
};

export default Commits;

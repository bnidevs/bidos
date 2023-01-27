const Commits = ({ author, time, title, hideBottomBorder }) => {
  return (
    <div
      className="clickable"
      style={{
        width: "100%",
        // backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        borderBottom: "solid",
        borderBottomColor: "white",
        borderWidth: hideBottomBorder ? 0.5 : 0,
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
        style={{ height: 30, width: 30, margin: 20 }}
      />
      <p style={{ fontSize: 10 }}>{title}</p>
    </div>
  );
};

export default Commits;

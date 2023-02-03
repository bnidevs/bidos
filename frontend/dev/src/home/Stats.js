const Stats = () => {
  return (
    <div
      style={{
        backgroundColor: "grey",
        marginTop: 50,
        height: "40vh",
        width: "80vw",
        display: "flex",
      }}
      className="animate__animated animate__fadeIn shadow statsCard"
    >
      {/* <h3>Stats (Last Week)</h3> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "40vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 0.3,
            // backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ marginTop: 20 }}>23 commits</h5>
          <h5 style={{ marginTop: 20, color: "#ff2954" }}>5 issues opened</h5>
          <h5 style={{ marginTop: 20, color: "#07e667" }}>2 issues resolved</h5>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 0.7,
            // backgroundColor: "red",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Stats;

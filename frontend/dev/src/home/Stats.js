import ProgressGraph from "./ProgressGraph";

const Stats = () => {
  return (
    <div className="animate__animated animate__fadeIn shadow statsCard">
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
            flex: 0.3,
          }}
          className="column-centered"
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
        >
          <ProgressGraph />
        </div>
      </div>
    </div>
  );
};

export default Stats;

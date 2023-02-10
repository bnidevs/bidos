import "./Home.css";
import { PageHeader } from "../components/Parts";
import { ProjectCard } from "../projects/Projects";
import Commits from "./Commits";
import StatButton from "./StatButton";
import { useState } from "react";
import Stats from "./Stats";

function HomePage() {
  const [state, setState] = useState({
    showStats: false,
  });

  const commits = [
    {
      title:
        "Add routing for the home page and two columns and titles with each section. Additionally, I added dummy data and a scroll view to show the user what projects they have been working on",
      author: "DJ Raamzeez",
      time: "2 days ago",
    },
    {
      title:
        "Add routing for the home page and two columns and titles with each section. Additionally, I added dummy data and a scroll view to show the user what projects they have been working on",
      author: "DJ Raamzeez",
      time: "2 days ago",
    },
    {
      title:
        "Add routing for the home page and two columns and titles with each section. Additionally, I added dummy data and a scroll view to show the user what projects they have been working on",
      author: "DJ Raamzeez",
      time: "2 days ago",
    },
  ];

  return (
    <section className="home_main">
      <PageHeader />
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div
            style={{
              height: "100%",
              flex: 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              className="animate__animated animate__fadeInLeft"
              style={{ fontSize: 30, margin: 30 }}
            >
              What You're Working On
            </h1>
            <div
              style={{
                height: 300,
                width: 425,
                overflowY: "auto",
              }}
            >
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
            </div>
          </div>
          <div
            style={{
              height: "100%",
              flex: 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              className="animate__animated animate__fadeInRight"
              style={{ fontSize: 30, margin: 30 }}
            >
              What You've Funded
            </h1>
            <div
              style={{
                height: 300,
                width: 425,
                overflowY: "auto",
              }}
            >
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div
            style={{
              height: "75%",
              flex: 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              className="animate__animated animate__fadeInLeft"
              style={{ fontSize: 30, margin: 30 }}
            >
              Latest Issues
            </h1>
            <div className="project-timeline">
              <h3 style={{ color: "black" }}>Recent Issues</h3>
              <div className="issue_wrapper">
                <a
                  href="https://localhost:3000"
                  className="flex contributor_link clean"
                >
                  <h5>
                    Fixed issues with package.json and prevented code from
                    breaking
                  </h5>
                </a>
              </div>
              <div className="issue_wrapper">
                <a
                  href="https://localhost:3000"
                  className="flex contributor_link clean"
                >
                  <h5>
                    Fixed issues with package.json and prevented code from
                    breaking
                  </h5>
                </a>
              </div>
              <div className="issue_wrapper">
                <a
                  href="https://localhost:3000"
                  className="flex contributor_link clean"
                >
                  <h5>
                    Fixed issues with package.json and prevented code from
                    breaking
                  </h5>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "75%",
              flex: 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              className="animate__animated animate__fadeInLeft"
              style={{ fontSize: 30, margin: 30 }}
            >
              Latest Commits
            </h1>
            <div
              style={{
                height: 212,
                width: 400,
                backgroundColor: "white",
                borderRadius: 10,
                overflowY: "auto",
              }}
              className="commitsCard gradient"
            >
              {/* <Commits /> */}
              {commits.map(({ author, time, title }, index) => {
                return (
                  <Commits
                    author={author}
                    time={time}
                    title={title}
                    hideBottomBorder={
                      index === commits.length - 1 ? false : true
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div
            style={{
              height: "75%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StatButton
              onClickHandler={() =>
                setState({ ...state, showStats: !state.showStats })
              }
            />
            {state.showStats && (
              <>
                <h1 style={{ marginTop: 100 }}>Last Week's Stats</h1>
                <Stats />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export { HomePage };

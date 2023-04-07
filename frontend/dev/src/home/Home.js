import "./Home.css";
import { PageHeader } from "../components/Parts";
import { ProjectCard } from "../projects/Projects";
import Commits from "./Commits";
import StatButton from "./StatButton";
import { useEffect, useState } from "react";
import Stats from "./Stats";
import { CircleLoader } from "react-spinners";
import DropdownButton from "./DropdownButton";
import axios from "axios";

function HomePage() {
  const [state, setState] = useState({
    latestIssuesProject: "Submitty",
    latestCommitsProject: "Submitty",
    showStats: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [commits, setCommits] = useState([]);
  const [commits, setCommits] = useState([
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
  ]);

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const defaultStyle = {
    height: 212,
    width: 400,
    backgroundColor: "white",
    borderRadius: 10,
    overflowY: "auto",
  };

  const fetchCommits = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/projects/commits",
        {
          user: "Raamzeez",
          repo: "presentation-maker",
        }
      );
      if (!response.status) {
        console.error(response.data);
        setError(response.data);
        setLoading(false);
      }
      console.log("commits", response.data);
      setCommits(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const onChangeHandler = (value, type) => {
    console.log(value);
    if (type === "issues") {
      setState({ ...state, latestIssuesProject: value });
    } else {
      setState({ ...state, latestCommitsProject: value });
    }
  };

  // useEffect(() => {
  //   fetchCommits();
  // }, []);

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
        <div
          style={{
            height: 5,
            width: "100%",
            backgroundColor: "dodgerblue",
            margin: 50,
          }}
        ></div>
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
              style={{ fontSize: 30 }}
            >
              Latest Issues
            </h1>
            <div style={{ marginTop: 30 }}>
              <DropdownButton
                value={state.latestIssuesProject}
                onChangeHandler={(value) => onChangeHandler(value, "issues")}
              />
            </div>
            <div className="project-timeline">
              <h3 style={{ color: "black" }}>
                {state.latestIssuesProject}'s Recent Issues
              </h3>
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
              className="animate__animated animate__fadeInRight"
              style={{ fontSize: 30 }}
            >
              Latest Commits
            </h1>
            <div style={{ marginTop: 30 }}>
              <DropdownButton
                value={state.latestCommitsProject}
                onChangeHandler={(value) => onChangeHandler(value, "commits")}
              />
            </div>
            <div
              style={
                loading
                  ? { ...defaultStyle, ...loadingStyle }
                  : { ...defaultStyle }
              }
              className="commitsCard gradient"
            >
              {!loading ? (
                <>
                  {commits.length > 0 ? (
                    <>
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
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <h3 style={{ marginTop: "17%", color: "#ff4d9d" }}>
                        Error
                      </h3>
                      <p style={{ marginTop: 10 }}>
                        Unable to find commits data
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <CircleLoader size={100} color={"white"} />
              )}
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
                <h1 style={{ marginTop: 100 }}>
                  Last Week's Stats for All Projects
                </h1>
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

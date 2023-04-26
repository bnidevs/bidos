//CSS Import
import "./Home.css";

//Libraries
import { useState } from "react";
import { CircleLoader } from "react-spinners";
import axios from "axios";

//Custom Components
import Commits from "./Commits";
import StatButton from "./StatButton";
import DropdownButton from "./DropdownButton";
import Stats from "./Stats";

import { PageHeader } from "../components/Parts";
import { ProjectCard } from "../projects/Projects";

const HomePage = () => {
  const [state, setState] = useState({
    latestIssuesProject: "Submitty", //String - Represents what project to show Github issues for on the home page
    latestCommitsProject: "Submitty", //Strings - Represents what project to show Github commits for on the home page
    showStats: false, //Boolean - Represents whether or not to show the stats graph at the bottom of the home page
  });

  const [loading, setLoading] = useState(false); //Boolean - Whether or not the commits are being loaded
  const [error, setError] = useState(false); //Boolean - Whether or not there was an error in the API request to get commits
  const [commits, setCommits] = useState([
    //Array of Objects - Temporary variable containing dummy data for commits
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

  //Style to be applied only when commits are being loaded
  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  //Style to be applied at all times for commits container
  const defaultStyle = {
    height: 212,
    width: 400,
    backgroundColor: "white",
    borderRadius: 10,
    overflowY: "auto",
  };

  //Async function that makes an API request to the server to fetch commits for a Github repository
  const fetchCommits = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/projects/commits", //Backend API Route
        //Dummy Data
        //Data should be sent in the form of {user: "XXXXX", repo: "XXXXX"}. Repo should be the github repository
        //from which you want to get the commits from, and user should be the user who owns the repository
        {
          user: "Raamzeez",
          repo: "presentation-maker",
        }
      );
      //If unable to get a response, stop the loading and set the error
      if (!response.status) {
        console.error(response.data);
        setError(response.data);
        setLoading(false);
      }
      console.log("commits", response.data);
      //Else, set the commits data in the webpage and stop the loading
      setCommits(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  //Handler used when choosing an item from the issues or commits project dropdown
  //type - Should only have a string value that is either "issues" or "commits"
  const onChangeHandler = (value, type) => {
    console.log(value);
    if (type === "issues") {
      setState({ ...state, latestIssuesProject: value });
    } else {
      setState({ ...state, latestCommitsProject: value });
    }
  };

  //Currently commented as backend is not working, but the useEffect will fetch all commits while page renders
  // useEffect(() => {
  //   fetchCommits();
  // }, []);

  return (
    <section className="home_main">
      <PageHeader />
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div className="home-page-column">
            <h1 className="home-page-heading">What You're Working On</h1>
            <div className="home-page-projects-container">
              {/* Dummy Data */}
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
            </div>
          </div>
          <div className="home-page-column">
            <h1 className="home-page-heading">What You've Funded</h1>
            <div className="home-page-projects-container">
              {/* Dummy Data */}
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
              <ProjectCard tagline="Test" pool={"$3000"} name={"Submitty"} />
            </div>
          </div>
        </div>
        <div className="home-page-divider"></div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div className="home-page-column">
            <h1 className="home-page-heading">Latest Issues</h1>
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
          <div className="home-page-column">
            <h1 className="home-page-heading">Latest Commits</h1>
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
                    <div className="column-centered">
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
          <div className="stats-container">
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
};

export { HomePage };

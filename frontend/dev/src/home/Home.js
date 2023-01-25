import "./Home.css";
import { PageHeader } from "../components/Parts";
import { ProjectCard } from "../projects/Projects";

function HomePage() {
  return (
    <section className="home_main">
      <PageHeader />
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
            height: 400,
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
      </div>
    </section>
  );
}

export { HomePage };

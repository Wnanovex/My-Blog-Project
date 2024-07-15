import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <section
        className="text-white d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          height: "500px",
          backgroundImage: "url('../hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="">WELCOME TO MY BLOG</h1>
        <Link className="btn btn-primary" to="/blog">
          START REDING
        </Link>
      </section>

      <section
        className="container d-flex align-items-center justify-content-between gap-3 mt-5 rounded m-auto p-4 flex-md-row flex-column"
        style={{
          backgroundColor: "#aea462",
          boxShadow: "1px 1px 10px rgb(15, 87, 231)",
        }}
      >
        <img
          className="rounded img-fluid"
          src="https://picsum.photos/200"
          alt=""
          style={{ width: "450px", height: "450px" }}
        />

        <div>
          <h2>HOW TO BE AN EXPERT IN 2024</h2>
          <h3>You can find a list of all programming languages here.</h3>
          <p>
            A blog (a truncation of "weblog") is an informational website
            consisting of discrete, often informal diary-style text entries
            (posts). Posts are typically displayed in reverse chronological
            order so that the most recent post appears first, at the top of the
            web page. In the 2000s, blogs were often the work of a single
            individual, occasionally of a small group, and often covered a
            single subject or topic. In the 2010s, "multi-author blogs" (MABs)
            emerged, featuring the writing of multiple authors and sometimes
            professionally edited.
          </p>
          <a
            href="#"
            className="btn btn-secondary"
            style={{ background: "#3c3737", border: "none" }}
          >
            READ MORE
          </a>
        </div>
      </section>

      <section className="mt-5 container d-flex align-items-center gap-2 flex-column flex-md-row">
        <div
          className="card"
          style={{
            width: "18rem",
            border: "2px solid rgb(93,188,252)",
            transition: "0.3s",
          }}
        >
          <img
            src="https://picsum.photos/201"
            className="card-img-top"
            alt="..."
          />
          <div
            className="card-body"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 200, 255, 0.308),rgba(250, 250, 250, 0.354))",
            }}
          >
            <p className="card-text">
              A blog is dynamic with many moving parts that change often,
              whereas a website is static.
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            width: "18rem",
            border: "2px solid rgb(93,188,252)",
            transition: "0.3s",
          }}
        >
          <img
            src="https://picsum.photos/202"
            className="card-img-top"
            alt="..."
          />
          <div
            className="card-body"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 200, 255, 0.308),rgba(250, 250, 250, 0.354))",
            }}
          >
            <p className="card-text">
              Blogging has been around for years and it has infiltrated all
              areas of the internet.
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            width: "18rem",
            border: "2px solid rgb(93,188,252)",
            transition: "0.3s",
          }}
        >
          <img
            src="https://picsum.photos/203"
            className="card-img-top"
            alt="..."
          />
          <div
            className="card-body"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 200, 255, 0.308),rgba(250, 250, 250, 0.354))",
            }}
          >
            <p className="card-text">
              Most blogs have a lot in common when it comes to how they are set
              up.
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            width: "18rem",
            border: "2px solid rgb(93,188,252)",
            transition: "0.3s",
          }}
        >
          <img
            src="https://picsum.photos/204"
            className="card-img-top"
            alt="..."
          />
          <div
            className="card-body"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 200, 255, 0.308),rgba(250, 250, 250, 0.354))",
            }}
          >
            <p className="card-text">
              What you do with a blog is entirely based on your personal
              preferences.
            </p>
          </div>
        </div>
      </section>

      <section
        className="mt-5 d-flex align-items-center justify-content-around p-3 text-white flex-wrap"
        style={{ backgroundColor: "#3f4a49" }}
      >
        <h3 className="p-3">Good Experiance</h3>
        <h3 className="p-3">Write a New Post</h3>
        <h3 className="p-3">More of Articals</h3>
        <h3 className="p-3">A New News Evry Day</h3>
      </section>
    </>
  );
}

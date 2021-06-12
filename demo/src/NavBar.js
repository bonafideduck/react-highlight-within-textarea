import React from "react";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNpm, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  // eslint-disable-next-line
  const github =
    "https://github.com/bonafideduck/react-highlight-within-textarea/";
  // eslint-disable-next-line
  const npmjs = "https://www.npmjs.com/package/react-highlight-within-textarea";

  return (
    <Navbar
      collapseOnSelect
      className="justify-content-between"
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <div>
        <Nav.Link href={npmjs}>
          <FontAwesomeIcon
            icon={faNpm}
            style={{ color: "white", fontSize: "2em" }}
          />
        </Nav.Link>
      </div>
      <div>
        <div className="h2" style={{ color: "white" }}>
          React Highlight Within Textarea
        </div>
      </div>
      <div>
        <Nav.Link href={github}>
          <FontAwesomeIcon
            icon={faGithub}
            style={{ color: "white", fontSize: "2em" }}
          />
        </Nav.Link>
      </div>
    </Navbar>
  );
}

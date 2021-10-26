import React from "react";
import Container from "react-bootstrap/Container";
import { NavBar } from "./NavBar.js";
import { String } from "./String.js";
import { Regexp } from "./Regexp.js";
import { Range } from "./Range.js";
import { Array } from "./Array.js";
import { Strategy } from "./Strategy.js";
import { CustomObject } from "./CustomObject.js";
import { Component } from "./Component.js";
import { ChangeValue } from "./ChangeValue.js";
import { ChangeSelection } from "./ChangeSelection.js";
import { Unwrapped } from "./Unwrapped.js";
import "./App.css";

const App = () => {
  return (
    <div style={{ background: "gray" }}>
      <Container
        style={{
          background: "white",
          maxWidth: 800,
          padding: 20,
          border: "solid 20px gray",
          margin: "auto",
        }}
      >
        <NavBar />
        <br />
        <String />
        <Regexp />
        <Range />
        <Array />
        <Strategy />
        <CustomObject />
        <Component />
        <ChangeValue />
        <ChangeSelection />
        <Unwrapped />
      </Container>
    </div>
  );
};

export { App };

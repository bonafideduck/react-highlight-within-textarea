import React from "react";
import Container from "react-bootstrap/Container";
import { NavBar } from "./NavBar";
import { String } from "./String";
import { Regexp } from "./Regexp";
import { Range } from "./Range";
import { Array } from "./Array";
import { StrategyDemo } from "./StrategyDemo";
import { CustomObject } from "./CustomObject";
import { Component } from "./Component";
import { ChangeValue } from "./ChangeValue";
import { ChangeSelection } from "./ChangeSelection";
import { Unwrapped } from "./Unwrapped";
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
        <StrategyDemo />
        <CustomObject />
        <Component />
        <ChangeValue />
        <ChangeSelection />
        <Unwrapped />
      </Container>
    </div>
  );
};

export default App;

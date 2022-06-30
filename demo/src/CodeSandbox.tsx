import React from "react";
interface Props {
  codeSandbox: string;
  style: React.CSSProperties;
}

function CodeSandbox(props: Props) {
  let { codeSandbox, style } = props;

  if (!codeSandbox) {
    return <></>;
  }
  return (
    <a style={style} href={"https://codesandbox.io/s/"+codeSandbox+"?fontsize=14&hidenavigation=1&theme=dark"}>
      <img
        style={{height: 35}}
        alt="Edit rhwta-string"
        src="https://codesandbox.io/static/img/play-codesandbox.svg"
      />
    </a>
  );
};

export { CodeSandbox };

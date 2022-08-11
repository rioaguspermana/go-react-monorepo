function logRender(props: { type: "page" | "component"; name: string }) {
  const logString = `%c${props.type} %c: ${props.name}`;
  let typeStyle = "color: white;padding-left: 4px;border-top-left-radius: 2px;border-bottom-left-radius: 2px;";
  let compStyle =
    "color: white;background: grey; padding: 0 4px;border-top-right-radius: 2px;border-bottom-right-radius: 2px;";
  if (props.type === "page") {
    typeStyle += "background: blue;";
  } else if (props.type === "component") {
    typeStyle += "background: green;";
  }
  console.log(logString, typeStyle, compStyle);
}

export default logRender;

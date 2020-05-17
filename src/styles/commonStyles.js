export default {
  hrText: {
    lineHeight: "1em",
    position: "relative",
    outline: 0,
    border: 0,
    color: "black",
    textAlign: "center",
    height: "1.5em",
    margin: "0px -20px 0px -20px",

    "&:before": {
      content: "''",
      background:
        "linear-gradient(to right, transparent,#616161, #818078, #616161, transparent)",
      position: "absolute",
      left: 0,
      top: "50%",
      width: "100%",
      height: 1
    },
    "&:after": {
      content: "attr(data-content)",
      position: "relative",
      display: "inline-block",

      padding: "0 .5em",
      lineHeight: "1.5em",
      // this is really the only tricky part, you need to specify the background color of the container element...
      color: "#818078",
      backgroundColor: "#fff"
    }
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px"
  }
};

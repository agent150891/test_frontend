import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default createMuiTheme({
  overrides: {
    MuiList: {
      root: {
        maxHeight: 208
      }
    }
  }
});

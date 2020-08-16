const { Plugin } = require("powercord/entities");
const { getModule, React } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
const { findInReactTree } = require("powercord/util");
const Settings = require("./Components/Settings");
const ApplySnippetButton = require("./Components/ApplySnippetButton");
module.exports = class JSS extends Plugin {
  startPlugin() {
    this.registerSettings("JS Snippets", "JS Snippets", Settings);
    this.loadStylesheet("./Styles/Card.scss");
    this.injectMiniPopover();
  }
  pluginWillUnload() {
    uninject("JSSApply");
  }

  async injectMiniPopover() {
    const MiniPopover = await getModule(
      (m) => m.default && m.default.displayName === "MiniPopover"
    );
    inject("JSSApply", MiniPopover, "default", (args, res) => {
      const props = findInReactTree(res, (r) => r && r.message && r.setPopout);
      if (!props || props.channel.id !== "609038134637887535") {
        return res;
      }

      res.props.children.unshift(
        React.createElement(ApplySnippetButton, {
          message: props.message,
          main: this,
        })
      );
      return res;
    });
    MiniPopover.default.displayName = "MiniPopover";
  }
};

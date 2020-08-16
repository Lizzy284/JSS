const {
  React,
  getModule,
  getModuleByDisplayName,
} = require("powercord/webpack");
const { Button } = require("powercord/components");
const { TabBar } = require("powercord/components");
const ManageSnippets = require("./ManageSnippets");
const CodeMirror = require("./CodeMirror");
module.exports = class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: "MANAGE_JS",
    };
  }

  render() {
    const { topPill, item } = getModule(["topPill"], false);
    if (this.state.tab === "MANAGE_JS") {
      return (
        <div>
          <div className="powercord-entities-manage-tabs">
            <TabBar
              selectedItem={this.state.tab}
              onItemSelect={(tab) => this.setState({ tab })}
              type={topPill}
            >
              <TabBar.Item
                className={item}
                selectedItem={this.state.tab}
                id="MANAGE_JS"
              >
                Manage Snippets
              </TabBar.Item>
              <TabBar.Item
                className={item}
                selectedItem={this.state.tab}
                id="QUICK_JS"
              >
                Edit JavaScript
              </TabBar.Item>
              <TabBar.Item
                className={item}
                selectedItem={this.state.tab}
                id="SETTINGS"
              >
                Settings
              </TabBar.Item>
            </TabBar>
          </div>
          <ManageSnippets />
        </div>
      );
    } else if (this.state.tab === "QUICK_JS") {
      return (
        <div>
          <div className="powercord-entities-manage-tabs">
            <TabBar
              selectedItem={this.state.tab}
              onItemSelect={(tab) => this.setState({ tab })}
              type={topPill}
            >
              <TabBar.Item
                className={item}
                selectedItem={this.state.tab}
                id="MANAGE_JS"
              >
                Manage Snippets
              </TabBar.Item>
              <TabBar.Item
                className={item}
                selectedItem={this.state.tab}
                id="QUICK_JS"
              >
                Edit JavaScript
              </TabBar.Item>
              <TabBar.Item
                className={item}
                selectedItem={this.state.tab}
                id="SETTINGS"
              >
                Settings
              </TabBar.Item>
            </TabBar>
          </div>
          <h1>Code mirror goes here soon</h1>
        </div>
      );
    } else if (this.state.tab === "SETTINGS") {
      return <h1>WIP</h1>;
    }
  }

  async getSnippets() {
    const fileContents = await readFile(
      join(__dirname, "..", "Snippets.js"),
      "utf8"
    );
    return fileContents;
  }
};

const { React } = require("powercord/webpack");
const { readFile, readdirSync } = require("fs").promises;
const { join } = require("path");
const SnippetCard = require("./SnippetCard.jsx");

module.exports = class ManageSnippets extends React.Component {
  constructor() {
    super();
    this.state = {
      snippets: null,
    };
  }
  async componentDidMount() {
    this.state.snippets = await this.getSnippets();
    if (this.state.snippets === "") this.state.snippets = null;
    this.forceUpdate();
  }
  render() {
    if (this.state.snippets !== null) {
      this.cards = [];
      this.state.snippets.split("/*").forEach((f) => {
        if (f === "") return;
        this.cards.push(
          <SnippetCard
            snippetID={f.split("Snippet ID:")[1].split(" ")[1].split(" ")}
            author={f.split("Author:")[1].split(" ")[1]}
            snippetCode={f.split("*/")[1]}
            dateCreated={f.split("Created At:")[0].split(" ")[1]}
          />
        );
      });
    }

    return (
      <>
        {this.state.snippets === null ? (
          <div className="powercord-plugin-soon powercord-text">
            <div className="wumpus">
              <img
                src="/assets/8c998f8fb62016fcfb4901e424ff378b.svg"
                alt="wumpus"
              />
            </div>
            <p>Looks like you have no snippets installed</p>
          </div>
        ) : (
          this.cards.map((f) => f)
        )}
      </>
    );
  }

  async getSnippets() {
    const fileContents = await readFile(
      join(__dirname, "..", "Snippets.js"),
      "utf8"
    );
    return fileContents;
  }
};

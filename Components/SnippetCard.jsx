const { React, getModule } = require("powercord/webpack");
const { Button } = require("powercord/components");

module.exports = class SnippetCard extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const { snippetID, snippetCode, dateCreated, author } = this.props;

    return (
      <div className="JSSCard">
        <p>Snippet ID: {snippetID}</p>
        <p>Author: {author}</p>
        <p>Date Created: {dateCreated}</p>
        {getModule(["parse", "parseTopic"], false).defaultRules.codeBlock.react(
          { content: snippetCode, lang: "js" },
          null,
          {}
        )}
        <div className="CardActionButtons">
          <Button
            className="ButtonZSF"
            onClick={() => eval(snippetCode)}
            color={Button.Colors.GREEN}
          >
            Run Code
          </Button>
          <Button className="ButtonZSF" color={Button.Colors.RED}>
            Remove Snippet
          </Button>
          <Button className="ButtonZSF">Edit Snippet</Button>
        </div>
      </div>
    );
  }
};

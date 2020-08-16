const { React } = require("powercord/webpack");
const { Clickable } = require("powercord/components");
const { appendFile } = require("fs");
const path = require("path")
class ApplyButton extends React.Component {
  render() {
    if (!this.props.message.content.includes("```js")) return <></>;
    return (
      <div
        className={["JSSApply", false ? "applied" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <Clickable
          onClick={() => {
            console.log(this.props.message);
            this.applySnippet(this.props.message)
          }}
        >
          Apply Snippet
        </Clickable>
      </div>
    );
  }

  applySnippet(message) {
    const dir = path.join(__dirname, "..", "Snippets.js");
    appendFile(
      dir,
      `/*\n Snippet ID: ${
        message.id
      }\n Author: ${message.author.username}\n Date Created: Now\n */${
        this.props.message.content.split("```js")[1].split("```")[0]
      }`, (err) => {
          if(err) console.error(err)
      }
    );
  }
}

module.exports = ApplyButton;

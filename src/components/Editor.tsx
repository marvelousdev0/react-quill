import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { Button, Dropdown } from "antd";

const SmartText = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    height={24}
    width={24}
  >
    <path d="M624.485 353.456l-104 104c-4.686 4.686-12.284 4.686-16.971 0l-104-104c-4.686-4.686-4.686-12.284 0-16.971l16.877-16.877c4.723-4.723 12.393-4.681 17.064.094L488 375.465V152H284.024a11.996 11.996 0 0 1-8.485-3.515l-24-24c-7.56-7.56-2.206-20.485 8.485-20.485H512c13.255 0 24 10.745 24 24v247.465l54.545-55.762c4.671-4.775 12.341-4.817 17.064-.094l16.877 16.877c4.686 4.686 4.686 12.284-.001 16.97zm-260.024 10.059a12.002 12.002 0 0 0-8.485-3.515H152V136.535l54.545 55.762c4.671 4.775 12.341 4.817 17.064.094l16.877-16.877c4.686-4.686 4.686-12.284 0-16.971l-104-104c-4.686-4.686-12.284-4.686-16.971 0l-104 104c-4.686 4.686-4.686 12.284 0 16.971l16.877 16.877c4.723 4.723 12.393 4.681 17.064-.094L104 136.535V384c0 13.255 10.745 24 24 24h251.976c10.691 0 16.045-12.926 8.485-20.485l-24-24z" />
  </svg>
);

const CustomHeart = () => <span>♥</span>;
function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}

function insertCustomTags(args) {
  console.log("insertCustomTags", args);
  const value = args;
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, value);
  this.quill.setSelection(cursorPosition + value.length);
}

function myDropdown(args) {
  console.log("myDropdown", args);
  const value = args.key;
  //   debugger;
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, `{{${value}}}`);
  this.quill.setSelection(cursorPosition + value.length + 4);
}

const items = [
  { key: "applicantName", label: "Applicant Name" },
  { key: "address", label: "Address" },
];

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => {
  return (
    <div id="toolbar">
      <select className="ql-font">
        <option value="arial" selected>
          Arial
        </option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium" selected>
          Size 3
        </option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
      <button className="ql-clean" />
      <button className="ql-insertHeart">
        <CustomHeart />
      </button>
      <select className="ql-insertCustomTags">
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
      <select className="ql-insertCustomTags1" id="cars">
        <optgroup label="Swedish Cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </optgroup>
      </select>
      <Dropdown
        menu={{ items, onClick: myDropdown }}
        trigger={["click"]}
        className="ql-myDropdown"
      >
        {/* <Button onClick={(e) => e.preventDefault()}> */}
        <SmartText />
        {/* </Button> */}
      </Dropdown>
      <select className="ql-smartText" defaultValue="" placeholder="Smart Text">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
    </div>
  );
};

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  state = { editorHtml: "" };

  handleChange = (html) => {
    console.log(html);
    this.setState({ editorHtml: html });
  };

  static modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart,
        insertCustomTags: insertCustomTags,
        myDropdown: myDropdown,
      },
    },
  };

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

export default Editor;

/* const App = () => (
  <div className="custom-toolbar-example">
    <h3>Custom Toolbar with React Quill (Fully working)</h3>
    <Editor placeholder={"Write something or insert a heart ♥"} />
  </div>
);

render(<App />, document.getElementById("root")); */

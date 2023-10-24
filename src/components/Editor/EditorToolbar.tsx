import { Quill } from "react-quill";
import { Button, Dropdown } from "antd";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

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

// Undo and redo functions for Custom Toolbar
function undoChange(this: any) {
  this.quill.history.undo();
}
function redoChange(this: any) {
  this.quill.history.redo();
}
function insertSmartText(this: any) {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "Hello, World! ");
  this.quill.setSelection(cursorPosition + 1);
}

const onSmartTextChange = (props: any) => {
  console.log(props);
  /* const cursorPosition = (this as any).quill.getSelection().index;
  console.log(cursorPosition); */
};

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

/* // Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true); */

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      smartText: insertSmartText,
      onSmartTextChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  //   "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const items = [
  { key: "applicantName", label: "Applicant Name" },
  { key: "address", label: "Address" },
];

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      {/* <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select> */}
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
    <span className="ql-formats">
      {/* <button className="ql-smartText">
        <SmartText />
      </button> */}
      <select className="ql-smartText" defaultValue="" placeholder="Smart Text">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
    </span>
    <span className="ql-formats">
      <select className="ql-insertCustomTags">
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
    </span>
    <span className="ql-formats">
      <Dropdown
        menu={{ items, onClick: onSmartTextChange }}
        trigger={["click"]}
        className="ql-onSmartTextChange"
      >
        <Button onClick={(e) => e.preventDefault()}>
          <SmartText />
        </Button>
      </Dropdown>
    </span>
  </div>
);

export default QuillToolbar;

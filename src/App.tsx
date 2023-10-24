import "./App.css";
import "react-quill/dist/quill.snow.css";
import Editor from "./components/Editor/Editor";

function App() {
  return (
    <div className="container">
      <div className="editor-container">
        <Editor />
      </div>
    </div>
  );
}

export default App;

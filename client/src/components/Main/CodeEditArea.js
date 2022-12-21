import React, {useEffect, useState} from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import './CodeEditArea.css'
const CodeEditArea = () => {
  const [code, setCode] = useState("")

  useEffect(() => {
    async function init() {
      Codemirror.fromTextArea(document.getElementById("codeEditor2"), {
        mode: { name: "text/x-c++src", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true
      });
    }
    init();
  }, []);

  return <div className="h-[65%]"><textarea className="rounded-lg h-[100%] border-gray-300" value={code} id="codeEditor2"></textarea></div>;
};

export default CodeEditArea;

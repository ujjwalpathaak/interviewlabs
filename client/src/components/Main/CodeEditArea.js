import React, { useEffect, useState, useRef, useContext } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";
import "codemirror/theme/cobalt.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { SocketContext } from "../../context/Socket";
import axios from "axios";
import { usePeer } from "../../context/Peer";

let REACT_APP_CODE_EXECUTE_URL = process.env.REACT_APP_COMPILERCONNECT_URL;

const CodeEditArea = (props) => {
  const [code, setCode] = useState(``);
  const [input, setInput] = useState(``);
  const [result, setResult] = useState(``);
  const { darkMode } = usePeer();
  const { socket } = useContext(SocketContext);
  const editorRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    if (editorRef.current === null) {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("codeEditor2"),
        {
          mode: { name: "text/x-c++src", json: true },
          theme: darkMode ? "cobalt" : "default", // Switch theme based on darkMode
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
    } else {
      editorRef.current.setOption("theme", darkMode ? "cobalt" : "default");
    }
    
    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      setCode(code);
      codeRef.current = code;
      if (origin !== "setValue") {
        socket.current.emit("code-change", {
          roomId: props.code,
          code: code,
        });
      }
    });
  
  }, [darkMode, props.code, socket]);

  const sendData = {
    inputCheck: input.length > 0 ? "true" : "false",
    input: input,
    code: code,
  };
  const handleSubmit = async () => {
    props.setLoading(true);
    socket.current.emit("code-sent-to-process",{
      roomId: props.code,
      code: code,
    })
    await axios({
      method: "post",
      url: `${REACT_APP_CODE_EXECUTE_URL}/cpp`,
      data: sendData,
    }).then((response) => {
      props.setLoading(false);
      socket.current.emit("output-change", {
        roomId: props.code,
        result: response.data.output,
      });
      setResult(response.data.output);
    });
  };

  const handletakeInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const currentSocket = socket.current;
    currentSocket.on("code-changed", ({ code }) => {
      if (code !== null) {
        editorRef.current.setValue(code);
      }
    });

    currentSocket.on("output-sent-to-process", ({ code }) => {
      props.setLoading(true);
    });

    currentSocket.on("output-changed", ({ result }) => {
      props.setLoading(false);
      setResult(result);
    });

    return () => {
      currentSocket.off("code-changed");
    };
  });

  return (
    <div className="flex flex-col sm:h-full sm:w-full">
      <div className="sm:h-[65%] w-full flex">
        <div className="w-[70%] h-[90%] pb-2 pr-1">
          <div className="dark:text-[#EEEEEE] text-gray-800  border-2 border-gray-400 border-b-0 sm:h-[10%]  p-2 flex items-center rounded-lg rounded-b-none dark:bg-[#001122] bg-gray-200 h-fit font-medium rounded-t-lg w-[100%]">
            Code
          </div>
          <textarea
            className="rounded-lg dark:bg-[#002240] bg-gray-200 h-[100%] w-1/2 border-solid border-2 dark:text-[#EEEEEE] text-gray-800 border-gray-400"
            value={code}
            id="codeEditor2"
          />
          <button
            onClick={handleSubmit}
            className="dark:text-[#EEEEEE] text-gray-800  bg-gray-200 border-2 border-gray-400 hover:bg-gray-400 dark:bg-[#001122] py-2 px-4 rounded absolute pb-3 mt-[-55px] ml-[10px]"
          >
            <span>Run</span>
          </button>
        </div>
        <div className="w-[30%] h-[90%] pb-2 pl-1">
          <div className="dark:text-[#EEEEEE] text-gray-800 border-2 border-gray-400 border-b-0 sm:h-[10%] p-2 flex items-center rounded-lg rounded-b-none dark:bg-[#001122] bg-gray-200  h-fit font-medium rounded-t-lg w-[100%]">
            Input
          </div>
          <textarea
            className="p-4 dark:bg-[#002240] bg-[#FFFFFF] rounded-lg rounded-t-none border-solid border-2 h-[100%] w-full border-gray-400 overflow-hidden dark:text-[#EEEEEE] text-gray-800 focus:border-gray-400"
            onChange={handletakeInput}
          />
        </div>
      </div>
      <div className="bg-[#EEEEEE] rounded-lg h-fit sm:h-[35%]">
        <div className="dark:text-[#EEEEEE] text-gray-800 border-2 border-gray-400 border-b-0 sm:h-[15%] p-2 flex items-center rounded-lg rounded-b-none dark:bg-[#001122] bg-gray-200  h-fit font-medium rounded-t-lg w-[100%]">
          Terminal
        </div>
        <div className="h-[100px] sm:h-[85%] p-4 rounded-lg border-solid border-2 dark:bg-[#002240] bg-[#FFFFFF]  border-gray-400 rounded-t-none dark:text-[#EEEEEE] text-gray-800">
          {result && <div>{result}</div>}
        </div>
      </div>
    </div>
  );
};

export default CodeEditArea;

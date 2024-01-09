import React, { useEffect, useState, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "./CodeEditArea.css";
import axios from "axios";

let REACT_APP_CODE_EXECUTE_URL = process.env.REACT_APP_COMPILERCONNECT_URL;

const CodeEditAreaMobile = (props) => {
  const [code, setCode] = useState(``);
  const [check, setCheck] = useState(false);
  const [input, setInput] = useState(``);
  const [result, setResult] = useState(``);
  const [terminal, setTerminal] = useState(false);

  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("codeEditor2"),
        {
          mode: { name: "text/x-c++src", json: true },
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current.on("change", (instance) => {
        const code = instance.getValue();
        setCode(code);
      });
    }
    init();
  }, []);

  const sendData = {
    inputCheck: check,
    input: input,
    code: code,
  };
  const handleSubmit = async () => {
    props.setLoading(true);
    await axios({
      method: "post",
      url: `${REACT_APP_CODE_EXECUTE_URL}/cpp`,
      data: sendData,
    }).then((response) => {
      props.setLoading(false);
      setResult(response.data.output);
    });
  };

  const doNothing = () => {
  };
  const handletakeInput = (e) => {
    setInput(e.target.value);
  };
  const handleHideTerminal = () => {
    setTerminal(false);
  };
  const handleShowTerminal = () => {
    setTerminal(true);
  };

  return (
    <div className="flex flex-col h-fit w-full">
      <div className="h-fit w-full flex flex-col">
        <div className="w-[100%] h-fit p-1">
          <div className="text-[#EEEEEE] sm:h-[10%] p-2 flex items-center rounded-lg rounded-b-none bg-[#222831] h-fit font-medium rounded-t-lg w-[100%]">
            Code
          </div>
          <textarea
            className="rounded-lg h-[100%] w-1/2 border-solid border-2 rounded-t-none border-gray-400"
            value={code}
            onChange={doNothing}
            id="codeEditor2"
          />
          <button
            onClick={handleSubmit}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded absolute pb-3 mt-[-55px] ml-[10px]"
          >
            <span>Run</span>
          </button>
        </div>
        <div className="w-[100%] h-fit p-1 mt-10">
          <div className="text-[#EEEEEE] sm:h-[10%] p-2 flex items-center rounded-lg rounded-b-none bg-[#222831] h-fit font-medium rounded-t-lg w-[100%]">
            Input
          </div>
          <textarea
            className="p-4 rounded-lg rounded-t-none border-solid border-2 h-[80%] w-full border-gray-400 focus:border-gray-400"
            onChange={handletakeInput}
          />
          <div className="h-[10%]">
            <label className="">
              <input
                type="radio"
                checked={check === true}
                value="true"
                name="tre"
                onChange={() => {
                  setCheck(true);
                }}
              />
              <span className="m-1">Input</span>
            </label>
            <label className="">
              <input
                type="radio"
                checked={check === false}
                value="false"
                name="fls"
                onChange={() => {
                  setCheck(false);
                }}
              />
              <span className="m-1">No Input</span>
            </label>
          </div>
        </div>
      </div>
      {terminal === true ? (
        <div className="absolute bg-[#EEEEEE] rounded-lg w-[98vw] h-fit mt-14 sm:h-[35%] top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
          <div className="text-[#EEEEEE] sm:h-[15%] p-2 flex items-center justify-between rounded-lg rounded-b-none bg-[#222831] h-fit font-medium rounded-t-lg w-[100%]">
            Terminal
            <button
              type="button"
              onClick={handleHideTerminal}
              className="rounded-md h-fit p-2 inline-flex items-center justify-center text-red-400 bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <svg
                className="h-2 w-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="h-[100px] sm:h-[85%] p-4 rounded-lg border-solid border-2 border-gray-400 rounded-t-none">
            {result && <div>{result}</div>}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleShowTerminal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 mt-12 py-1 px-4 rounded-full h-fit inline-flex items-center justify-center "
        >
          ^ Terminal
        </button>
      )}
    </div>
  );
};

export default CodeEditAreaMobile;

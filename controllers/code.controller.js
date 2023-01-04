dotenv.config();
import dotenv from "dotenv";
import axios from "axios";

let JDOODLE_URL = process.env.JDOODLE_URL
let JDOODLE_CLIENTID = process.env.JDOODLE_CLIENTID
let JDOODLE_CLIENTSECRET = process.env.JDOODLE_CLIENTSECRET

export const executeCode = async (request, response) => {
  try {
    const script = request.body.script;
    let res = await axios.post(`${JDOODLE_URL}`, {
      clientId: `${JDOODLE_CLIENTID}`,
      clientSecret: `${JDOODLE_CLIENTSECRET}`,
      script: script,
      language: "cpp",
      versionIndex: "0",
    });
    console.log(res.data.output);
    response.status(200).json(res.data.output);
  } catch (error) {
    console.log(error);
  }
};

// Sample code
  // script:`#include <iostream>\n
  // using namespace std;\n
  // int main() {\n
  //   int x=13577;\n
  //   int y=555;\n
  //   int z=x+y;\n
  //   cout<<\"Sum of x+y =\" << z;\n
  // }`,
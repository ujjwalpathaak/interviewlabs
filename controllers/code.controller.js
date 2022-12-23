import axios from "axios";

export const executeCode = async (request, response) => {
  // console.log(script)
  try {
    const script = request.body.script;
    let res = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: "10f99b1136e87401a49dc720f35456d4",
      clientSecret:
        "ff2f7a4382c7e2ad2b33d0239971f35a6f28eefcc43240b791e23882ea0a1c71",
      // script:`#include <iostream>\n
      // using namespace std;\n
      // int main() {\n
      //   int x=13577;\n
      //   int y=555;\n
      //   int z=x+y;\n
      //   cout<<\"Sum of x+y =\" << z;\n
      // }`,
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

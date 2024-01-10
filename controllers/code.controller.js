dotenv.config();
import dotenv from "dotenv";
import axios from "axios";

let CODE_EXEC = process.env.CODE_EXEC;

export const executeCode = async (request, response) => {
  try {
    const { inputCheck, input, code } = request.body;

    let strCheck = inputCheck.toString();

    var res = await axios.post(`${CODE_EXEC}`, {
      inputCheck: strCheck,
      input: input,
      code: code,
    });
    return response.status(200).json(res.data);
  } catch (error) {}
};

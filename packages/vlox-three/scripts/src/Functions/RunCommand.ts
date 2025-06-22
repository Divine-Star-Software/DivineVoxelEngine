import { exec } from "child_process";
export const runCommand = (command: string) =>
  new Promise(async (resolve) => {
    exec(command, { shell: "powershell.exe" }, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        resolve(false);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        resolve(false);
        return;
      }
      console.log(`[${command}]\n${stdout}`);
      resolve(true);
    });
  });
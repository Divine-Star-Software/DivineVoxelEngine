import CreateFlowEditor from "@dvegames/vlox-tools/Flow/CreateFlowEditor";
import "./index.css";
async function InitFlowEditor() {
  CreateFlowEditor();

}

document.addEventListener("DOMContentLoaded", InitFlowEditor);

// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
import { HashConnect } from "hashconnect";
import * as hashgraph from "@hashgraph/sdk";

// const connectHashGraph = require("./modules/hashConnect")
// require = require("esm")(module/* , options */)

// document.body.appendChild(connectHashGraph());
window.HashConnect = HashConnect
window.hashgraph = hashgraph
// module.exports = require("./main.js")

/**
 * @fileoverview Custom eslint rules for Property Finder FE
 * @author Pavlo Lompas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async askFor() {
    const prompts = [
      {
        type: "input",
        name: "userName",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "ruleName",
        message: "What is the rule name?",
      },
      {
        type: "input",
        name: "ruleDescription",
        message: "Type a short description of this rule:",
      },
      {
        type: "input",
        name: "validCode",
        message: "Type a short example of the code that will pass:"
      },
      {
        type: "input",
        name: "invalidCode",
        message: "Type a short example of the code that will fail:"
      }
    ];

    const props = await this.prompt(prompts)

    this.userName = props.userName;
    this.ruleName = props.ruleName;
    this.ruleDescription = props.ruleDescription;
    this.validCode = props.validCode;
    this.invalidCode = props.invalidCode;
  }

  writing() {
    const { userName, ruleName, ruleDescription, validCode, invalidCode } = this

    this.fs.copyTpl(
      this.templatePath('rule.ejs'),
      "lib/rules/" + this.ruleName + '.js',
      { userName, ruleName, ruleDescription, validCode, invalidCode }
    );
    this.fs.copyTpl(
      this.templatePath('test.ejs'),
      "tests/lib/rules/" + this.ruleName + '.js',
      { userName, ruleName, ruleDescription, validCode, invalidCode }
    );
    this.fs.copyTpl(
      this.templatePath('RuleTester.js'),
      "tests/RuleTester.js"
    )
  }
};

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async askFor() {
    const prompts = [
      {
        type: 'input',
        name: 'userName',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'ruleName',
        message: 'What is the rule name?'
      },
      {
        type: 'input',
        name: 'ruleDescription',
        message: 'Type a short description of this rule:'
      },
      {
        type: 'input',
        name: 'validCode',
        message: 'Type a short example of the code that will pass:'
      },
      {
        type: 'input',
        name: 'invalidCode',
        message: 'Type a short example of the code that will fail:'
      }
    ];

    const props = await this.prompt(prompts);

    this.userName = props.userName;
    this.ruleName = props.ruleName;
    this.ruleDescription = props.ruleDescription;
    this.validCode = props.validCode;
    this.invalidCode = props.invalidCode;
  }

  writing() {
    const {
      userName,
      ruleName,
      ruleDescription,
      validCode,
      invalidCode
    } = this;
    this.fs.copyTpl(
      this.templatePath('docs/rules/rule.ejs'),
      'docs/rules/' + this.ruleName + '.md',
      { userName, ruleName, ruleDescription, validCode, invalidCode }
    );
    this.fs.copyTpl(
      this.templatePath('lib/rules/rule.ejs'),
      'lib/rules/' + this.ruleName + '.js',
      { userName, ruleName, ruleDescription, validCode, invalidCode }
    );
    this.fs.copyTpl(this.templatePath('tests/fixtures'), 'tests/fixtures');
    this.fs.copyTpl(
      this.templatePath('tests/lib/rules/rule.ejs'),
      'tests/lib/rules/' + this.ruleName + '.js',
      { userName, ruleName, ruleDescription, validCode, invalidCode }
    );
    this.fs.copyTpl(
      this.templatePath('tests/lib/RuleTester.js'),
      'tests/lib/RuleTester.js'
    );
  }
};

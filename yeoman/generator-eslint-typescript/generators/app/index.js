const Generator = require("yeoman-generator");

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.generators = {
      Rule: 'eslint-typescript:rule'
    }
  }

  async prompting() {
    const answers = await this.prompt({
      type: 'list',
      name: 'outputType',
      message: 'What do you want to generate',
      choices: Object.keys(this.generators),
      default: 'Rule'
    })

    this.composeWith(this.generators[answers.outputType])
  }
};

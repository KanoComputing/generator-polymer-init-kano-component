'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('Kano Component') + ' generator!'
    ));

    const prompts = [{
      type: 'list',
      name: 'version',
      message: 'What type of element would you like to build?',
      choices: [{
        name: 'Polymer 2.x',
        value: 'polymer-2.x'
      },{
        name: 'Polymer hybrid',
        value: 'polymer-hybrid'
      }],
      default: 'polymer-2.x'
    }, {
      type: 'input',
      name: 'name',
      message: 'What name should I give to your component?',
      default: 'kano-component'
    }, {
      type: 'input',
      name: 'description',
      message: 'What is the purpose of this element? (description)'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const elementName = this.props.name;
    const version = this.props.version;

    // Generate the class name from the kebab cased attribute style name
    const elementClassName = elementName.replace(/-([a-z])/g, (m, w) => {
      return w.toUpperCase();
    });

    this.props.elementClassName = elementClassName.charAt(0).toUpperCase() + elementClassName.slice(1);

    this.fs.copyTpl(
      `${this.templatePath()}/${version}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    // Copy dotfiles
    this.fs.copy(
      `${this.templatePath()}/${version}/.*`,
      this.destinationRoot()
    );

    this.fs.copyTpl(
      `${this.templatePath()}/${version}/_element.html`,
      this.destinationPath(`${elementName}.html`),
      this.props
    );

    this.fs.copyTpl(
      `${this.templatePath()}/${version}/test/_element_test.html`,
      this.destinationPath(`test/${elementName}_test.html`),
      this.props
    );
  }

  install() {
    this.bowerInstall();
  }
};

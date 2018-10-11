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
        name: 'Polymer 3.x',
        value: 'polymer-3.x'
      },{
        name: 'Polymer app component',
        value: 'app-component'
      }],
      default: 'polymer-3.x'
    }, {
      type: 'input',
      name: 'name',
      message: 'What name should I give to your component?',
      default: 'kwc-component'
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

    if (version !== 'app-component') {
      // Copy gitignore
      this.fs.copy(
        `${this.templatePath()}/${version}/_gitignore`,
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        `${this.templatePath()}/${version}/_npmignore`,
        this.destinationPath('.npmignore')
      );
      this.fs.copyTpl(
        `${this.templatePath()}/${version}/test/_element.test.js`,
        this.destinationPath(`test/${elementName}.test.js`),
        this.props
      );
    }

    this.fs.copyTpl(
      `${this.templatePath()}/${version}/_eslintrc.js`,
      this.destinationPath('.eslintrc.js'),
      this.props
    );

    this.fs.copyTpl(
      `${this.templatePath()}/${version}/_element.js`,
      this.destinationPath(`${elementName}.js`),
      this.props
    );
  }

  install() {
    const version = this.props.version;
    if (version !== 'app-component') {
      this.yarnInstall();
    }
  }
};

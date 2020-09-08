const jsonpath = require('jsonpath');
const data = require('./data.json');

global.data = data;
global.jp = jsonpath;

const tests = {
  'very generic': () => {
    jsonpath.query(data, `$..*[?(@.id=='2020-01-a-02-01')]`);
  },
  'very specific': () => {
    jsonpath.query(data, `$..contents.section.subsections[*].parts[*]..questions[?(@.id=='2020-01-a-02-01')]`);
  },
  'pinpoint specific': () => {
    jsonpath.query(data, `$[0].contents.section.subsections[0].parts[1].questions[0]`);
  }
}

const runTests = () => {
  console.log('Testing...');

  Object.entries(tests).forEach(([name, test]) => {
    console.time(name);

    [...Array(100)].forEach(() => {
      test();
    });
    console.timeEnd(name);
  });
};

global.runTests = runTests;

// runTests();

// const allQuestionIDs = jp1.query(data, `$..contents.section.subsections[*].parts[*]..questions[*].type`);
// console.log(new Set(allQuestionIDs));
// console.log(jp1.query(data, `$..[*].contents.section.subsections[*].parts[*]..questions[?(@.id=='2020-03-b-01-03')]`));
// console.log(jp1.query(data, `$..[*].contents.section.subsections[*].parts[*].questions[?(@.type=='fieldset')].questions[?(@.id=='2020-03-b-01-03')]`));
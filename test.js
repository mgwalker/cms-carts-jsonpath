const jp1 = require('jsonpath');
const jp2 = require('@astronautlabs/jsonpath').JSONPath;
const data = require('./data.json');

global.data = data;
global.jp = jp1;

const tests = {
  'jsonpath - very generic': () => {
    jp1.query(data, `$..*[?(@.id=='2020-01-a-02-01')]`);
  },
  'jsonpath - very specific': () => {
    jp1.query(data, `$..contents.section.subsections[*].parts[*]..questions[?(@.id=='2020-01-a-02-01')]`);
  },
  '@astronautlabs/jsonpath - very generic': () => {
    jp2.query(data, `$..*[?(@.id=='2020-01-a-02-01')]`);
  },
  '@astronautlabs/jsonpath - very specific': () => {
    jp2.query(data, `$..contents.section.subsections[*].parts[*]..questions[?(@.id=='2020-01-a-02-01')]`);
  }
}

const runTests = () => {
  console.log('Testing...');

  Object.entries(tests).forEach(([name, test]) => {
    console.time(name);
    [...Array(50)].forEach(() => {
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
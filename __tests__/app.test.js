import '@testing-library/jest-dom';
import testingLibrary from '@testing-library/dom';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';
import run from '../src/app.js';

nock.disableNetConnect();

/* eslint no-underscore-dangle: [2, { "allow": ["__filename", "__dirname"] }] */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '__fixtures__', filename);

const pathToDefaultFixture = path.join('__tests__', '__fixtures__', 'index.html');

const { screen, waitFor, fireEvent } = testingLibrary;

let elements;

const nockHeaders = {
  'Access-Control-Allow-Origin': '*',
};

beforeEach(() => {
  const initHtml = fs.readFileSync(pathToDefaultFixture).toString();
  document.body.innerHTML = initHtml;
  run();

  elements = {
    input: screen.getByTestId('input'),
    form: screen.getByTestId('rss-form'),
    feedback: screen.getByTestId('feedback'),
  };
});

test('invalid url', async () => {
  fireEvent.input(elements.input, { target: { value: 'aaa' } });
  fireEvent.submit(elements.form);
  await waitFor(() => expect(screen.getByText('Link must be a valid URL')));
});

test('invalid format', async () => {
  nock('https://allorigins.hexlet.app')
    .get(`/get?disableCache=true&url=${encodeURIComponent('https://www.google.com/')}`)
    .reply(200, { contents: 'aaa' }, nockHeaders);

  fireEvent.input(elements.input, {
    target: { value: 'https://www.google.com/' },
  });
  fireEvent.submit(elements.form);
  await waitFor(() => expect(screen.getByText('The resource does not contain valid RSS')));
});

test('valid rss and duplicate', async () => {
  const validRSS = fs.readFileSync(getFixturePath('lessons.xml')).toString();

  nock('https://allorigins.hexlet.app')
    .get((uri) => uri.includes('get'))
    .reply(200, { contents: validRSS }, nockHeaders);

  fireEvent.input(elements.input, {
    target: { value: 'https://ru.hexlet.io/lessons.xml' },
  });
  fireEvent.submit(elements.form);
  await waitFor(() => expect(screen.getByText('RSS has been successfully loaded')));
  fireEvent.input(elements.input, {
    target: { value: 'https://ru.hexlet.io/lessons.xml' },
  });
  fireEvent.submit(elements.form);
  await waitFor(() => expect(screen.getByText('RSS already exists')))
});

const { fileLink } = require('../config').storageBot;
const request = require('supertest');

describe(`TEST storage`, async () => {
  let link;
  test(
    'Upload file',
    async () => {
      const { text } = await request(fileLink)
        .post('/')
        .field('filename', 'test')
        .attach('document', `${__dirname}/testImg.jpg`)
        .expect(200);
      link = text;
    },
    1000 * 60,
  );

  test(
    'Download file',
    async () => {
      await request(link)
        .get('/')
        .expect(200);
    },
    1000 * 60,
  );
});

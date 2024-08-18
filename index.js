console.log('hello world');
const dotenv = require('dotenv');
const express = require('express');
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
dotenv.config();
console.log('port is: ', process.env.PORT);

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
});

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: 'sanjaym2002-demo',
    Key: key,
  });
  const signedUrl = await getSignedUrl(s3Client, command);
  return signedUrl;
}

async function putObject(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: 'sanjaym2002-demo',
    Key: `demo-uploads/users/${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function listObjects() {
  const command = new ListObjectsV2Command({
    Bucket: 'sanjaym2002-demo',
  });
  const list = await s3Client.send(command);
  return list;
}

async function main() {
  //   const res = await getObjectUrl('demoFolder1/testImage.jpeg');
  //   console.log('url for test image is: ', res);
  //   const res2 = await putObject(`image-${Date.now()}.jpeg`, 'image/jpeg');
  //   console.log('url for uploading: ', res2);

  const res3 = await listObjects();
  console.log('list of objects: ', res3);
}

main();

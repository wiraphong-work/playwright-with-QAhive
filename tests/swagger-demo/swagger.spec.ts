import { test, expect, request } from "@playwright/test";
import { ApiTesting } from "../component/global-fuction";

const data_regis = {
  email: "Testing11@gmail.com",
  password: "Testing01",
  name: "Testing01",
  gender: "male",
};

const component = new ApiTesting();
let access_token;
let access_token_example = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8wMUBkZW1vLmNvbSIsInJvbGVzIjpbXSwiaWF0IjoxNzEwMzE2MjQxLCJleHAiOjE3MTA0ODkwNDF9.xuZbt06OGBPKZOvrTXmtep_yc63hxB8KunqiTMepDx8';
const baseURL = 'https://api-web-demo.qahive.com'

//เล่นได้ 3 API
test("Register", async ({ request }) => {
  const response = await request.post(
    `${baseURL}/auth/register`,
    { data: data_regis }
  );
  await expect(response.status()).toBe(201);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
  await component.checkKeyOfJson(responseBody, [
    "access_token",
    "refresh_token",
  ]);
});

test("Login", async ({ request }) => {
  const response = await request.post(
    `${baseURL}/auth/login`,
    { data: data_regis }
  );
  await expect(response.status()).toBe(201);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
  await component.checkKeyOfJson(responseBody, [
    "access_token",
    "refresh_token",
  ]);
  access_token = await responseBody.access_token;
});

test("Get product list", async ({ request }) => {
  const response = await request.get(
    `${baseURL}/ecommerce/product-list`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  await expect(response.status()).toBe(200);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
  await component.checkKeyOfJson(responseBody[0], [
    "_id",
    "name",
    "detail",
    "price",
    "imageUrl",
    "id",
  ]);
});


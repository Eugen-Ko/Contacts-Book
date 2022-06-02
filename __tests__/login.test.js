const express = require("express");
const request = require("supertest");
const jwt = require("jsonwebtoken");


const { User } = require("../models");
const login = require("../controllers/auth/login");


const req = {
  body: {
    email: "q2@qqq.com",
    password: "222222",
  }

}
const res = {};

const app = express();
app.get("/api/auth/login", login(req, res));

describe('Test User login', () => {
  beforeAll(() => {
    app.listen(3000);
    const mockUser = {
      _id: "62911fa6590927e2c229f3d3",
      name: 'qqqqq2',
      email: 'q2@qqq.com',
      password: '$2a$10$HYGYAHbQ8pu60EKzdvzvM.ngMK8M6I28jmzFliAYCi4Dcxnwqrk16',
      subscription: 'starter',
      token: null,
      avatarURL: 'public/avatars/62911fa6590927e2c229f3d3_beer.jpg',

      comparePassword: jest.fn(() => true),
    };

    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTExZmE2NTkwOTI3ZTJjMjI5ZjNkMyIsImlhdCI6MTY1NDAyMjk0NiwiZXhwIjoxNjU0MDI2NTQ2fQ.46_JxCOsBS8QvquzR_nLVSVm5RuxnvcbS-EpMMtRRBY';

    jest.spyOn(User, 'findOne').mockImplementationOnce(() => mockUser);
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => mockToken);
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(async () => { return ({ ...mockUser, token: mockToken }) });

  });
  afterAll(() => process.close(0));

  test("Return status 200 with correct data", async () => {
    const response = await request(app).get("/api/auth/login");
    expect(response.status).toBe(200);
  });

  test("Check token, email, subscription", async () => {
    const response = await login(req, res);
    expect(response.data.token).toBeDefined();
    expect(response.data.user).toContainAllKeys(['mail', 'subscription']);
    expect(response.data.user.email).toBeString();
    expect(response.data.user.subscription).toBeString();
  });

});


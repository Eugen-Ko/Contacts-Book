const express = require("express");
const request = require("supertest");
const jwt = require("jsonwebtoken");

require('dotenv').config();
const PORT = process.env.PORT || 3000;



const { User } = require("../models");
const login = require("../controllers/auth/login");

const app = express();
app.use(express.json());
app.get("/api/auth/login", login);
const server = app.listen(PORT);


describe('Test User login', () => {
  beforeAll(() => {
    () => server;

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
  afterAll(() => server.close());

  test("Return status 200 with correct data", async () => {
    const res = await request(app)
      .get("/api/auth/login")
      .send({
        email: "q2@qqq.com",
        password: "222222",
      })
    expect(res.status).toBe(200);
  });

  test("Checking if the token field exists", async () => {
    const res = await request(app)
      .get("/api/auth/login")
      .send({
        email: "q2@qqq.com",
        password: "222222",
      })
    expect(res.body.data.token).toBeDefined();
  });

  test("Checking if the user object exists", async () => {
    const res = await request(app)
      .get("/api/auth/login")
      .send({
        email: "q2@qqq.com",
        password: "222222",
      })
    expect(res.body.data.user).toHaveProperty('email');
    expect(res.body.data.user).toHaveProperty('subscription');
    expect(typeof res.body.data.user.email).toBe("string");
    expect(typeof res.body.data.user.subscription).toBe("string");
  });

});


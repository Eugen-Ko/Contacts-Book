// const express = require("express");
// const request = require("supertest");
// const mongoose = require("mongoose");
// require('dotenv').config();
const login = require("../controllers/auth/login");
const { Unauthorized } = require("http-errors");
const { User } = require("../models");

// const { DB_HOST, PORT = 3000 } = process.env;

// const app = express();
// const server = app.listen(PORT);
// mongoose.connect(DB_HOST);

// app.get('/api/auth/login', login);

describe('Test User login', () => {
  // beforeAll(() => server);
  // afterAll(() => process.on('SIGINT', () => {
  //   server.close(() => {
  //     process.exit();
  //   });
  // }));

  it("Return status 200 with correct data", async () => {
    const mockReq = {
      body: {
        email: "q2@qqq.com",
        password: "222222",
      }

    }
    const mockRes = {};

    jest.spyOn(User, 'findOne', 'findByIdAndUpdate')
      .mockImplementationOnce(() => { });

    // const response = await request(app)
    // .get(login(mockReq, mockRes));


  })

});



// --------------------3 ---------------------
// const request = require("supertest");
// const express = require("express");

// const app = express();
// const server = require("../../bin/server");
// // const app = require("../../app");
// const login = require("./login");

// describe("Test example", () => {
//   beforeAll(() => server);
//   test("GET /", async () => {
//     request(app)
//       .get("/api/auth/login", login)
//       .send({
//         email: "q2@qqq.com",
//         password: "222222"
//       })
//       .expect(200)
//     // More logic goes here
//   });
//   // More things come here
// });

// ------------------2 -----------------------
// const express = require("express");

// const server = require("../../bin/server");
// // const app = require('../../app');

// const app = express();
// const login = require("./login");

// describe("Test example", () => {
  // beforeAll(() => server);
//   // More things come here
//   test("GET /api/auth/login", (done) => {
//     request(app)
//       .get("/api/auth/login", login)
      // .send({
      //   email: "q2@qqq.com",
      //   password: "222222"
      // })
//       .expect(200)
//       .expect((res) => { console.log(res.body) });
//     // Logic goes here
//   });
// });

// const express = require("express");
// const mongoose = require("mongoose");
// // const app = require("../app");
// require('dotenv').config();
// const server = require("../../bin/server");
// const login = require("./login");
// const { DB_HOST, PORT = 3000 } = process.env;

// const app = express();

// describe("test login controller", () => {
//   beforeAll(() => server);
//   afterAll(() => server.close(0));
//   test("login", async () => {
//     const response = await request(app)
//       .get("/api/auth/login", login)
//       .send({
//         email: "q2@qqq.com",
//         password: "222222"
//       });
//     console.log("status: ", response.status);
//     expect(response.status).toBe(200);
//   });
// });


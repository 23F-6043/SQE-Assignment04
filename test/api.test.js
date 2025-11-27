const frisby = require('frisby');
const Joi = frisby.Joi;

const BASE_URL = "https://jsonplaceholder.typicode.com";

describe("USER API TESTS - 2 PASS & 2 FAIL", () => {

  it("GET /users should return 200 and an array", () => {
    return frisby
      .get(`${BASE_URL}/users`)
      .expect("status", 200)
      .expect("jsonTypes", "*", {
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
      });
  });

  it("GET /users/1 should return a single user", () => {
    return frisby
      .get(`${BASE_URL}/users/1`)
      .expect("status", 200)
      .expect("json", "id", 1)
      .expect("jsonTypes", {
        name: Joi.string(),
        phone: Joi.string(),
      });
  });

  it("POST /users should fail because wrong expected status", () => {
    return frisby
      .post(`${BASE_URL}/users`, {
        name: "Test User",
        email: "test@example.com"
      })
      .expect("status", 201); // WRONG ON PURPOSE → WILL FAIL
  });


  it("GET /users/1 should fail because expecting non-existing field", () => {
    return frisby
      .get(`${BASE_URL}/users/1`)
      .expect("jsonTypes", {
        age: Joi.number() // DOES NOT EXIST → WILL FAIL
      });
  });

});

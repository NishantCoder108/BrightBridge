const request = require("supertest");
const app = require("../dist/app");

describe("User Signup", () => {
  it("should create a new user with valid data", async () => {
    const res = await request(app)
      .post("/api/users") // Adjust the endpoint accordingly
      .send({
        username: "testuser111",
        email: "test111@example.com",
        password: "password111",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id"); // Adjust based on your response structure
  });

  it("should not create a user with existing email", async () => {
    // Assuming 'test@example.com' already exists
    const res = await request(app).post("/api/users").send({
      username: "testuser111",
      email: "test111@example.com",
      password: "password111",
    });
    expect(res.statusCode).toEqual(400);
  });

  // Add more tests for invalid data, missing fields, etc.
});

describe("User Login", () => {
  it("should log in a user with correct credentials", async () => {
    const res = await request(app).post("/api/login").send({
      email: "test111@example.com",
      password: "password111",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token"); // If you're using JWT tokens
  });

  it("should not log in a user with incorrect credentials", async () => {
    const res = await request(app).post("/api/login").send({
      email: "test111@example.com",
      password: "wrongPassword",
    });
    expect(res.statusCode).toEqual(401);
  });

  // Add more tests for missing fields, invalid email format, etc.
});

afterAll(async () => {
  // Close server and database connections
  // e.g., if you have a function to close your server, call it here
  console.log("All done");
});

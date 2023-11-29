import supertest from "supertest";
import { app } from "../main";
import prisma from "../db/db";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: "test@gmail.com",
      },
    });
  });

  it("should return 200 OK", async () => {
    const result = await supertest(app).post("/api/users").send({
      email: "test@gmail.com",
      password: "testing",
      name: "Test User",
    });

    expect(result.status).toEqual(201);
    expect(result.body.data.name).toEqual("Test User");
    expect(result.body.data.email).toEqual("test@gmail.com");
    expect(result.body.data.password).toBeUndefined();
  });
});

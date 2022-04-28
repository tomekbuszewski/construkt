import * as supertest from "supertest";
import { app } from "../src/main";

describe("[API] Main methods", () => {
  describe("[GET]", () => {
    it("properly returns hello message", async () => {
      const response = await supertest(app).get("/api");

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ message: "Welcome to backend!" });
    });
  });
});

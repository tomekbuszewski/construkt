import * as supertest from "supertest";
import { app } from "../src/main";

import { cities, companies, specialities } from "@construkt/mock-db";

describe("[API] Main methods", () => {
  describe("[GET]", () => {
    it("properly lists companies", async () => {
      const { body } = await supertest(app).get("/api/items");

      expect(body).toMatchObject(companies);
    });

    it("should properly filter companies basing on cities", async () => {
      const city = cities[0].id;
      const { body } = await supertest(app).get("/api/items").query({ city });

      expect(body).toMatchObject(
        companies.filter((item) => item.city.id === city),
      );
    });

    it("should properly filter companies basing on specialities", async () => {
      const spec1 = specialities[0].id;
      const spec2 = specialities[1].id;
      const { body } = await supertest(app)
        .get("/api/items")
        .query({ specialities: [spec1, spec2] });

      expect(body).toMatchObject(
        companies.filter(({ specialities }) =>
          specialities.find(({ id }) => id === spec1 || id === spec2),
        ),
      );
    });

    it("should return empty collection when filtering criteria are not met", async () => {
      const { body } = await supertest(app)
        .get("/api/items")
        .query({ city: "non-existent-id" });

      expect(body).toMatchObject([]);
    });
  });
});

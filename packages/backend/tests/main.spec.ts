import * as supertest from "supertest";
import { app } from "../src/main";

import { cities, companies, specialities } from "@construkt/mock-db";
import { ROUTES } from "../src/routes";

describe("[API] Main methods", () => {
  describe("[GET]", () => {
    const getUrl = (item: ROUTES): string => `${ROUTES.API_MAIN}/${item}`;

    it("properly lists companies", async () => {
      const { body } = await supertest(app).get(getUrl(ROUTES.COMPANIES));

      expect(body).toMatchObject(companies);
    });

    it("should search by full name", async () => {
      const name = companies[1].name;

      const { body } = await supertest(app)
        .get(getUrl(ROUTES.COMPANIES))
        .query({ search: name });

      expect(body).toMatchObject(
        companies.filter((item) => item.name === name),
      );
    });

    it("should search by partial name", async () => {
      const name = companies[1].name.substring(4);

      const { body } = await supertest(app)
        .get(getUrl(ROUTES.COMPANIES))
        .query({ search: name });

      expect(body).toMatchObject(
        companies.filter((item) => item.name.includes(name)),
      );
    });

    it("should properly filter companies basing on cities", async () => {
      const city = cities[0].id;
      const { body } = await supertest(app)
        .get(getUrl(ROUTES.COMPANIES))
        .query({ city });

      expect(body).toMatchObject(
        companies.filter((item) => item.city.id === city),
      );
    });

    it("should properly filter companies basing on specialities", async () => {
      const spec1 = specialities[0].id;
      const spec2 = specialities[1].id;
      const { body } = await supertest(app)
        .get(getUrl(ROUTES.COMPANIES))
        .query({ specialities: [spec1, spec2] });

      expect(body).toMatchObject(
        companies.filter(({ specialities }) =>
          specialities.find(({ id }) => id === spec1 || id === spec2),
        ),
      );
    });

    // TODO: Implement cascade filtering
    xit("should join queries", async () => {
      const spec = specialities[1].id;
      const city = cities[2].id;

      const { body } = await supertest(app)
        .get(getUrl(ROUTES.COMPANIES))
        .query({
          city,
          specialities: spec,
        });

      expect(body).toMatchObject([companies[0]]);
    });

    it("should return empty collection when filtering criteria are not met", async () => {
      const { body } = await supertest(app)
        .get(getUrl(ROUTES.COMPANIES))
        .query({ city: "non-existent-id" });

      expect(body).toMatchObject([]);
    });

    it("should return an error when filtering by unknown keyword", async () => {
      const { status } = await supertest(app)
        .get(getUrl(ROUTES.COMPANIES))
        .query({ "random-key": "random-value" });

      expect(status).toBe(409);
    });
  });
});

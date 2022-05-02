import * as express from "express";
import { getCities, getCompanies, getSpecialities, ROUTES } from "./routes";

import helmet from "helmet";
import { corsMiddleware } from "./middleware/cors";

export const app = express();

const router = express.Router();

app.use(helmet());
app.use(corsMiddleware);
app.use(ROUTES.API_MAIN, router);

router.route(ROUTES.COMPANIES).get(getCompanies);
router.route(ROUTES.CITIES).get(getCities);
router.route(ROUTES.SPECIALITIES).get(getSpecialities);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.NX_BACKEND_PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}${ROUTES.API_MAIN}`);
  });
  server.on("error", console.error);
}

import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./routes/activities.tsp";
import "./routes/casts.tsp";
import "./routes/characters.tsp";
import "./routes/episodes.tsp";
import "./routes/organizations.tsp";
import "./routes/people.tsp";
import "./routes/programs.tsp";
import "./routes/records.tsp";
import "./routes/reviews.tsp";
import "./routes/series.tsp";
import "./routes/staffs.tsp";
import "./routes/statuses.tsp";
import "./routes/users.tsp";
import "./routes/works.tsp";

using TypeSpec.Http;

@service(#{ title: "Annict REST API (非公式ドキュメント)" })
@server("https://api.annict.com")
@useAuth(
  OAuth2Auth<[
    {
      type: OAuth2FlowType.authorizationCode,
      authorizationUrl: "https://annict.com/oauth/authorize",
      tokenUrl: "https://annict.com/oauth/token",
      scopes: ["read", "write"],
    }
  ]> | BearerAuth
)
@route("/v1")
namespace Annict;

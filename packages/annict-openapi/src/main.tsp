import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";
import "./routes/works.tsp";

using TypeSpec.Http;

@service(#{ title: "Annict REST API" })
@server("https://api.annict.com")
@useAuth(BearerAuth)
@route("/v1")
namespace Annict;

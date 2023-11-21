import fastapi
from strawberry.fastapi import GraphQLRouter
from .gqls import schema

app = fastapi.FastAPI()

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/gql")
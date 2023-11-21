import strawberry

from .userModel import (
    UserGQLModel,
    user_by_id,
    user_page,
    user_insert,
    user_update,
    user_delete
)

@strawberry.type(description="root")
class Query:
    user_by_id = user_by_id
    user_page = user_page

@strawberry.type(description="root")
class Mutation:
    user_insert = user_insert
    user_update = user_update
    user_delete = user_delete

schema = strawberry.federation.Schema(Query, mutation=Mutation)
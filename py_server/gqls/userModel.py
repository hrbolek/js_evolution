import typing
import strawberry
import uuid


from ._resolvers import (
    resolve_id,
    resolve_name,
    resolve_surname,
    resolve_email,
    createResolveReference,
    createResolveById,
    createResolvePage,
    createInsert,
    createUpdate,
    createDelete
)

@strawberry.federation.type(description="user model")
class UserGQLModel():

    resolve_reference = createResolveReference("users")
    id = resolve_id
    name = resolve_name
    surname = resolve_surname
    email = resolve_email
    

user_by_id = createResolveById("users", UserGQLModel)
user_page = createResolvePage("users", UserGQLModel)

@strawberry.input(description="user insert")
class UserInputCreateGQLModel:
    name: str = strawberry.field(description="use name")

    id: typing.Optional[uuid.UUID] = strawberry.field(description="client generated id", default="")
    surname: typing.Optional[str] = strawberry.field(description="user surname", default="")
    email: typing.Optional[str] = strawberry.field(description="user email", default="")    

@strawberry.input(description="user update")
class UserInputUpdateGQLModel:
    id: uuid.UUID = strawberry.field(description="id")

    name: typing.Optional[str] = strawberry.field(description="user name", default=None)    
    surname: typing.Optional[str] = strawberry.field(description="user surname", default=None)    
    email: typing.Optional[str] = strawberry.field(description="user email", default=None)        

@strawberry.input(description="user delete")
class UserInputDeleteGQLModel:
    id: uuid.UUID = strawberry.field(description="id")

@strawberry.type(description="information about result of CUD operations")
class UserMutationResultGQLModel:
    id: uuid.UUID
    msg: str

    @strawberry.field(description="subject of operation")
    def user(self, info: strawberry.types.Info) -> UserGQLModel:
        return UserGQLModel.resolve_reference(info, self.id)
    
user_insert = createInsert("users", UserInputCreateGQLModel, UserMutationResultGQLModel)
user_update = createUpdate("users", UserInputUpdateGQLModel, UserMutationResultGQLModel)
user_delete = createDelete("users", UserInputDeleteGQLModel, UserMutationResultGQLModel)
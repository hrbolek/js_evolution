import typing
import strawberry
import uuid

db = {
    "users": {
        "9c501da6-5f66-4932-ad9d-fc00541366d7": {
            "id": "9c501da6-5f66-4932-ad9d-fc00541366d7",
            "name": "John"
        },
        "0897e2ad-4bab-4234-a0cc-ed780883a2bf": {
            "id": "0897e2ad-4bab-4234-a0cc-ed780883a2bf",
            "name": "Julia"
        }
    }
}

@strawberry.field(description = "primary key")
def resolve_id(self, info: strawberry.types.Info) -> uuid.UUID:
    return self["id"]

@strawberry.field(description = "name")
def resolve_name(self, info: strawberry.types.Info) -> str:
    return self["name"]

@strawberry.field(description = "surname")
def resolve_surname(self, info: strawberry.types.Info) -> typing.Optional[str]:
    return self.get("surname", None)

@strawberry.field(description = "email")
def resolve_email(self, info: strawberry.types.Info) -> typing.Optional[str]:
    return self.get("email", None)

def createResolveReference(tableName):
    @classmethod
    def resolve_reference(cls, info: strawberry.types.Info, id: uuid.UUID):
        table = db.get(tableName, None)
        assert table is not None, f"Table '{tableName}' not found"
        id = f"{id}"
        row = table.get(id, None)
        return row
    return resolve_reference

def createResolveById(tableName, GQLModel):
    @strawberry.field(description=f"{tableName} by id resolver")
    def by_id(self, info: strawberry.types.Info, id: uuid.UUID) -> GQLModel:
        table = db.get(tableName, None)
        assert table is not None, f"Table '{tableName}' not found"
        id = f"{id}"
        row = table.get(id, None)
        return row        
    return by_id

def createResolvePage(tableName, GQLModel):
    @strawberry.field(description=f"{tableName} by id resolver")
    def page(self, info: strawberry.types.Info) -> typing.List[GQLModel]:
        table = db.get(tableName, None)
        assert table is not None, f"Table '{tableName}' not found"
        rows = (item for id, item in table.items())
        return rows
    return page

def createInsert(tableName, InputModel, ResultModel):
    @strawberry.mutation(description=f"Insert operation")
    def insert(self, info: strawberry.types.Info, input: InputModel) -> ResultModel:
        dictData = strawberry.asdict(input)
        table = db.get(tableName, None)
        assert table is not None, f"Table '{tableName}' not found"
        if dictData.get('id', None) in [None, ""]:
            dictData["id"] = f"{uuid.uuid1()}"
        id = f"{dictData['id']}"
        row = table.get(id, None)
        assert row is None, f"Data with id=`{id}` already exists"
        table[id] = {**dictData}
        result = ResultModel(id = dictData["id"], msg= "ok")
        return result
    return insert

def createUpdate(tableName, InputModel, ResultModel):
    @strawberry.mutation(description=f"Insert operation")
    def update(self, info: strawberry.types.Info, input: InputModel) -> ResultModel:
        dictData = strawberry.asdict(input)
        id = f"{dictData['id']}"
        table = db.get(tableName, None)
        assert table is not None, f"Table '{tableName}' not found"
        row = table.get(id, None)
        assert row is not None, f"record with id=`{id}` does not exists"
        
        dictData = {key: value for key, value in dictData.items() if value is not None}

        table[id] = {**row, **dictData}
        result = ResultModel(id= dictData["id"], msg= "ok")
        return result
    return update

def createDelete(tableName, InputModel, ResultModel):
    @strawberry.mutation(description=f"Insert operation")
    def delete(self, info: strawberry.types.Info, input: InputModel) -> ResultModel:
        dictData = strawberry.asdict(input)
        id = f"{dictData['id']}"
        print("delete", dictData)
        table = db.get(tableName, None)
        assert table is not None, f"Table '{tableName}' not found"
        row = table.get(id, None)
        assert row is not None, f"record with id=`{id}` does not exists"
        del table[id]
        result = ResultModel(id = dictData["id"], msg= "ok")
        return result
    return delete
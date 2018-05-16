
Graphql notes:

Graphql helps us define types and schema on server.
There may be some builtin types.
When we say types, we mean builtin types or user-defined types like Person etc.

Types will have kinds, basically one of:
1. Scalar
2. Object
3. Union
4. Interface
5. Enum
6. INPUT_OBJECT
7. LIST
8. NON_NULL

GraphQL supports type name introspection at any point within a query 
by the meta field  __typename: String! when querying against any Object, Interface, or Union. 
It returns the name of the object type currently being queried.

This is most often used when querying against Interface or Union types
 to identify which actual type of the possible types has been returned.

 The schema introspection system is accessible from the meta fields __schema and __type 
 which are accessible from the type of the root of a query operation.

__schema: __Schema!
__type(name: String!): __Type

### Unions

Unions do not define any fields, so no fields may be queried on union kinded type without use of typed fragments.

Given the type language:
``` graphql
union SearchResult = Photo | Person

type Person {
  name: String
  age: Int
}

type Photo {
  height: Int
  width: Int
}

type SearchQuery {
  firstSearchResult: SearchResult
}
```

and the query in query language,
you cannot directly ask for fields inside SearchResult, use fragments on Person or fragments on Photo
``` graphql
{
    firstSearchResult{
        ... on Person {
            name
        }
        ... on Photo {
            height
        }
    }
}
```

In case of unions or interfaces, one can use such typed fragments on query which may or may not match and return the corresponding results.

**NOTE** - The member types of a Union type must all be Object kinded types. Scalar kinded types, Interface kinded types and Union kinded types may not be member types of Union kinded type.



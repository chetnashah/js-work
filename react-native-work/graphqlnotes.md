
Graphql notes:

Graphql helps us define types and schema on server.
There may be some builtin types.

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
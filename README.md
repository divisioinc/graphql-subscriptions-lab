# Subscriptions Lab - Divisio

A repo to explore GraphQL subscriptions

## What's inside?

- Client: [divisio-frontend-next-boilerplate](https://github.com/divisioinc/divisio-frontend-next-boilerplate)
  - I've removed Husky
- Server: [divisio-practice-backend/victor](https://github.com/cordeirovictorhc/divisio-practice-backend)

## Docs

- [Getting started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
- [Apollo Server Subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

---

- Kill process Ubuntu

```(bash)
$ sudo kill -9 `sudo lsof -t -i:4000`
```

### To-do:

- Add comments to Post model
- Setup PubSub
- Implement Post subscriptions resolvers
- Implement Comment resolvers

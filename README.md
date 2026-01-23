# Test zimpligital music player

## Setup

### Node version require --> Node 22 ++

Make sure to install dependencies:

```bash
# npm
npm install

# yarn
yarn
```

## Development Server Setup

install docker and run `docker compose up -d` 

set database table as 

```bash
# npm
npm run migrate:dev 

# yarn
yarn migrate:dev
```

Seed data for test
```bash
# npm
npm run seed

# yarn
yarn seed
```
Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# yarn
yarn dev
```

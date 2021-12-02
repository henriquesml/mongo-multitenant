# Mongo Multitenant
A small and simple library for multitenant database with mongo in nodejs 

## Install

#### Yarn

```bash
yarn add mongo-multitenant
```

#### Npm

```bash
npm i mongo-multitenant
```

## How to use?

#### 1. Create your schemas

```JavaScript
import { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String }
  }
)


export { UserSchema }
```

#### 2. Create configuration file in the root path

```JavaScript
// multitenant.config.js

import { UserSchema } from 'src/schemas'

export ={
  prefixDatabaseName: "tenant",
  mongoURI: "mongodb://username:password@mongodb.example.com:27017",
  models: [
    { name: "user", schema: UserSchema }
  ]
}
```

#### 3. Use your models and record data in multitenant database

```JavaScript
import mongoMultitenant from 'mongo-multitenant'

const userModel = mongoMultitenant({ modelName: 'user', tenantId: '1' })
userModel.create({ name: 'Henrique Schmeller', email: 'henrique_schmeller@hotmail.com' })
```

#### Result

TODO: Add print

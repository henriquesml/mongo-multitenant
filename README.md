# Mongo Multitenant
A small and simple library for multitenant database with Mongo in Nodejs 

## 📦 Install

#### Yarn

```bash
yarn add mongo-multitenant
```

#### Npm

```bash
npm i mongo-multitenant
```

## ℹ️ How to use?

### 1. Create your schemas

```JavaScript
// src/database/schemas/user.js

import { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String }
})


export { UserSchema }
```

### 2. Create and export a mongo-multitenant instance

See the setings options that can be passed to MongoMultitenant constructor:

**mongoURI**: The mongo connection url. This value will be something like mongodb://root:root@localhost:27017

**prefixDatabaseName**?: The prefix each database will have at creation time. **Default value is tenant**

**logs**?: If true, you will be informed via console on each iteration of your application with mongo-multitenant. **Default value is true**

**connectOptions**?: Mongoose connect options params, see more about them at: https://mongoosejs.com/docs/connections.html#options

**models**: Array of { name: string; schema: Mongoose.Schema }. You must pass all models you want to use through mongo-multitenant.

```JavaScript
// src/database/mongo-multitenant.js

import { UserSchema } from 'src/schemas'

export default new MongoMultitenant({
  mongoURI: 'mongodb://root:root@localhost:27017',
  prefixDatabaseName: 'tenant',
  models: [
    { name: 'users', schema: UserSchema }
    // ...Others models here
  ]
})
```

### 3. Use your models and record data in multitenant database

```JavaScript
import mongo from './database/mongo-multitenant'

...

// Get one of your declarated models. The model method return a Mongoose.Model instance

// tenant('1') can also be tenant(organization.id), it's your choice!
const UserModel = mongo.tenant('1').model('users')

// Create a user
const newUser = await UserModel.create({ name: 'Henrique Schmeller', email: 'henrique_schmeller@hotmail.com'})

// Find a user
const user = await UserModel.where({ name: 'Henrique Schmeller' })
```

### Result

After creating data using mongo-multitenant, you will have databases created with the prefix informed in the settings

![MongoDB Compass example](/docs/tenant.png)

## 🤝 **Contributing**
All kinds of contributions are very welcome and appreciated!

-   ⭐️ Star the project
-   🐛 Find and report issues
-   📥 Submit PRs to help solve issues or add features
-   ✋ Influence the future of mongo-multitenant with feature requests
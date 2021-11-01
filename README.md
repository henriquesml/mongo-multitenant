# Mongoose Multitenant

#### 1. Create your schemas

```TS
import { Schema } from 'mongoose'

export interface UserSchemaProps extends Document {
  name: string
  email: string
}

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String }
  }
)

export { UserSchema }
```

#### 2. Inform schemas and models for tenantConnection

```TS
import { tenantConnection } from ' mongoose-multitenant'

function connection({ uri, tenantId }) {
  return tenantConnection({
    uri,
    tenantId,
    modelsAndSchemas: [
      { model: 'users', schema: UserSchema },
      // All models and schemas here.
    ]
  })
}
```

#### 3. Use getModel to select your model

```TS
import { getModel } from ' mongoose-multitenant'

const UserModel = getModel<UserSchemaProps>({
  connection: connection({ uri, tenantId }), // use the function that returns tenantConnection
  tenantId: 'TENANT_IDENTIFIER',
  modelName: 'users'
})

return await UserModel.create({
  name,
  email
})
```
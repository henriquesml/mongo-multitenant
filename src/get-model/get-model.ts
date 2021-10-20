import {
  GetModelProps,
  GetModelResponse
} from './get-model.props'

export function getModel<T>({
  tenantId,
  connection,
  modelName
}: GetModelProps): GetModelResponse<T> {
  const tenant = connection({ tenantId })
  return tenant.model<T>(modelName)
}

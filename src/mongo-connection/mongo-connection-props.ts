import { ConnectOptions } from "mongoose"

export type ConnectionProps = {
  uri: string
  options?: ConnectOptions
  logs: boolean
}

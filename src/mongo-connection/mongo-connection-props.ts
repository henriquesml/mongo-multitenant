import { ConnectOptions, Connection } from "mongoose"

export type ConnectionProps = {
  uri: string
  options?: ConnectOptions
}

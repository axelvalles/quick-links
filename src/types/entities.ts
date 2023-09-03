import { type Database } from './database'

export type UserEntity = Database['public']['Tables']['users']['Row']
export type LinkEntity = Database['public']['Tables']['links']['Row']

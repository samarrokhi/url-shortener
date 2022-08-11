import ShortUniqueId from 'short-unique-id'

export type UidCreator = () => string

const uid = new ShortUniqueId({ length: 10 })
export const createUid: UidCreator = () => uid()
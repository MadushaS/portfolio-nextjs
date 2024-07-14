import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemaTypes/blockContent'
import category from './schemaTypes/category'
import post from './schemaTypes/post'
import author from './schemaTypes/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent],
}

export type SanityPost = {
  author: { name: string, },
  slug: { current: string, _type: string },
  categories: [{ title: string }],
  mainImage: { _type: string, asset: { _ref: string, _type: string } },
  _id: string,
  title: string,
  description: string,
  publishedAt: string
}
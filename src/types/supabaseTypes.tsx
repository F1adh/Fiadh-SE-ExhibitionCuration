export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: number
          collection_name: string
        }
        Insert: {
          collection_name: string
        }
        Update: {
          collection_name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          id: number
          object_id: string
          collection_id: number
        }
        Insert: {
          object_id: string
          collection_id: number
        }
        Update: {
          object_id?: string
          collection_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'objects_collection_id_fkey'
            columns: ['collection_id']
            referencedRelation: 'collections'
            referencedColumns: ['id']
          }
        ]
      }
    }
  }
}
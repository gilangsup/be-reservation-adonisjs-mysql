import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Meeting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public room_name: string

  @column({})
  public room_capacity: number

  @column({})
  public room_display: string

  @column({})
  public room_port: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static table = 'meetings'
}

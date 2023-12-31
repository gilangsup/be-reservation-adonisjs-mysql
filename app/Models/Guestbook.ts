import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Guestbook extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public nama: string

  @column({})
  public company: string

  @column({})
  public purpose: string

  @column({})
  public meet_with: string

  @column({})
  public date: Date

  @column({})
  public time: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Meeting from 'App/Models/Meeting'

export default class MeetingsController {

    public async store({ response, request }: HttpContextContract) {

        const roomdId = request.input('RoomID')
        const startDate = request.input('StartDate')
        const endDate = request.input('EndDate')
        const startTime = request.input('StartTime')
        const endTime = request.input('EndTime')
        const guest = request.input('Guest')
        const purpose = request.input('Purpose')
        const order = request.input('Order')
        const approval = request.input('Approval')
        const createdByUser = request.input('CreatedByUser')

        try {
            await Meeting.create({
                RoomID: roomdId,
                StartDate: startDate,
                StartTime: startTime,
                EndDate: endDate,
                EndTime: endTime,
                Guest: guest,
                Purpose: purpose,
                Order: order,
                Approval: approval,
                CreatedByUser: createdByUser
            })
            return response.status(200).json({
                code: 200,
                status: 'Success',
                message: 'Success input data'
            })
        } catch (error) {
            return response.status(500).json({
                code: 500,
                status: 'Error',
                message: error.message
            })
        }
    }

    public async index({ response }: HttpContextContract) {
        try {
            const meetings = await Database.from('meeting_names').select('*')
            return response.status(200).json({
                code: 200,
                status: 'success',
                data: meetings
            })
        } catch (error) {
            return response.status(500).json({
                code: 500,
                status: 'error',
                message: error.message
            })
        }

    }

}

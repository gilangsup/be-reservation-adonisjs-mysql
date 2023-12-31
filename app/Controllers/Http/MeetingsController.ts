import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Meeting from 'App/Models/Meeting'

export default class MeetingsController {

    public async custom({ request, response }: HttpContextContract) {
        const roomId = request.input("RoomID");
        const meetName = request.input("MeetName");
        const startDate = request.input("StartDate");
        const endDate = request.input("EndDate");
        const startTime = request.input("StartTime");
        const endTime = request.input("EndTime");
        const guest = request.input("Guest");
        const purpose = request.input("Purpose");
        const order = request.input("Order");
        const createdByUser = request.input("CreatedByUser");
        const departmentId = request.input("DepartmentID");

        try {
            const query = `
            INSERT INTO meeting_lists (RoomID, MeetName, StartDate, StartTime, EndDate, EndTime, Guest, Purpose, \`Order\`, CreatedByUser, DepartmentID)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

            await Database.rawQuery(query, [
                roomId,
                meetName,
                startDate,
                startTime,
                endDate,
                endTime,
                guest,
                purpose,
                order,
                createdByUser,
                departmentId,
            ]);

            return response.status(200).json({
                code: 200,
                status: "Success",
                message: "Success input data",
            });
        } catch (error) {
            return response.status(500).json({
                code: 500,
                status: "Error",
                message: error.message,
            });
        }
    }


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
                CreatedByUser: createdByUser,
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
            const meetings = await Database.from('meeting_lists').select('*')
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

    public async showAllMeet({ response }: HttpContextContract) {
        try {
            const result = await Database.query()
                .select('meeting_lists.*', 'meeting_rooms.room_name', 'meeting_rooms.room_capacity', 'meeting_rooms.room_port', 'meeting_rooms.room_display')
                .from('meeting_rooms')
                .innerJoin('meeting_lists', 'meeting_lists.RoomID', 'meeting_rooms.id')

            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({
                code: 500,
                status: 'Error',
                message: error.message,
            });
        }
    }

    public async showMeetByID({ response, params }: HttpContextContract) {
        let id = params.id
        try {
            const result = await Database
                .from('meeting_lists')
                .select('*')
                .orderBy('StartTime', 'asc')
                .where('meeting_lists.RoomID', id)
                .first()
            return response.status(200).json({
                code: 200,
                status: 'Success',
                data: result
            })
        } catch (error) {
            return response.status(500).json({
                code: 500,
                status: 'Error',
                message: error.message,
            });
        }
    }
}

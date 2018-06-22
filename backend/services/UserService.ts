import * as Knex from 'knex';
import * as path from "path";
import * as fs from "fs-extra";
import { Promise as BlueBirdPromise } from "bluebird";
import { default as joinjs } from 'join-js';

export default class UserService {
    
    private resultMaps: Array<Object>;
    
    constructor(private knex: Knex) {
        this.knex = knex;
        this.resultMaps = [
            {
                mapId: 'userEventsMap',
                idProperty: 'id',
                properties: ['name', 'photo'],
                collections: [
                    { name: 'events', mapId: 'eventsMap', columnPrefix: 'events_' },
                    { name: 'items', mapId: 'itemsMap', columnPrefix: 'items_' },
                ]
            },
            {
                mapId: 'eventsMap',
                idProperty: 'id',
                properties: ['name', 'datetime', 'photo'],
                collections: [
                    { name: 'items', mapId: 'itemsMap', columnPrefix: 'items_' },
                ]   //wouldnt eventsMap duplicate if called by userEventsMap?
            },
            {
                mapId: 'itemsMap',
                idProperty: 'id',
                properties: ['name', 'quantity', 'completed']
            }
        ]
    }
    
    getById(userid: number) {
        return this.knex("events")
        .select(
            "users.id           as user_id",
            "users.name         as user_name",
            "users.photo        as user_photo",
            "events.id          as events_id",
            "events.name        as events_name",
            "events.datetime    as events_datetime",
            "events.photo       as events_photo",
            "items.id           as items_id",
            "items.name         as items_name",
            "items.quantity     as items_quantity",
            "items.completed    as items_completed"
        )
        .join("events_users", "events_users.events_id", "events.id")
        .join("users", "events_users.users_id", "users.id")
        .join("items", "items.users_id", "users.id")
        .join("todo", function () {
            this
            .on("todo.id", "items.todo_id")
            .andOn("todo.events_id", "events.id")
        })
        .where("users.id", userid)
        .andWhere("events.isactive", true)
        .andWhere("items.isactive", true)
        .andWhere("users.isactive", true)
        .then(result => {
            return joinjs.mapOne(result, this.resultMaps, 'userEventsMap', 'user_');
        })
    }
    
    postById(userid: number) {
        return this.knex("users")


    
    writeFile(eventid: number, name: string, body: Express.Multer.File, trx:Knex) {
        const imagePath = path.join(__dirname, `../public/images/${name}`);
        fs.outputFile(imagePath, body.buffer)
        return trx("events").where("events.id", eventid).update({ photo: name })
      }

    getByEmail(email: string, password: string) {
        return this.knex('users')
        .select('id')
        .first()
        .where("email", email)
        .andWhere("password", password)
    }
}
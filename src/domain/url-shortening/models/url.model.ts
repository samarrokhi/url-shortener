
import { ObjectId } from "mongodb";

export class UtmModel {
    constructor(public source?: string, public medium?: string, public campaign?: string) { }
}

export class UrlModel {
    constructor(
        public uid: string,
        public shortUrl: string,
        public longUrl: string,
        public longUrlWithUtm: string,
        public utm?: UtmModel,
        public id?: ObjectId
    ) { }
}
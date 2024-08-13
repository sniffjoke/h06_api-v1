import {ObjectId} from "mongodb";

export interface IComment {
    _id: ObjectId;
    content: string;
    commentatorInfo: {
      userId: string,
      userLogin: string
    };
    createdAt?: string;
}

import {ObjectId} from "mongodb";
import {commentCollection} from "../db/mongo-db";
import {IComment} from "../types/comments.interface";


export const commentsQueryRepository = {
    async findCommentById(id: ObjectId) {
        return await commentCollection.findOne({_id: id})
    },

    async commentOutput(id: ObjectId) {
        const comment = await this.findCommentById(id)
        return this.commentMapOutput(comment as IComment)
    },

    commentMapOutput(comment: IComment) {
        const {_id, createdAt, commentatorInfo, content} = comment
        return {
            id: _id,
            content,
            commentatorInfo,
            createdAt,
        }
    },

    async commentsSortWithQuery (query: any) {
        const queryName = query.searchNameTerm !== null ? query.searchNameTerm : ''
        const filter = {
            name: {$regex: queryName, $options: "i"},
        }
        const comments = await commentCollection
            .find(filter)
            .sort(query.sortBy, query.sortDirection)
            .limit(query.pageSize)
            .skip((query.page - 1) * query.pageSize)
            .toArray()
        return comments
    }
}

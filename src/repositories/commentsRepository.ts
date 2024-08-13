import {commentCollection} from "../db/mongo-db";
import {ObjectId, UpdateResult} from "mongodb";
import {commentsQueryRepository} from "../queryRepositories/commentsQueryRepository";
import {CommentDBType} from "../dtos/comments.dto";
import {IComment} from "../types/comments.interface";


export const commentsRepository = {

    async getAllComments(query: any) {
        const comments = await commentsQueryRepository.commentsSortWithQuery(query)
        return {
            ...query,
            items: comments.map(comment => commentsQueryRepository.commentMapOutput(comment))
        }
    },

    async createComment(newComment: CommentDBType): Promise<Omit<IComment, '_id'>> {
        const comment = {
            ...newComment,
            createdAt: new Date(Date.now()).toISOString()
        }
        await commentCollection.insertOne(comment)
        return comment
    },

    async updateCommentById(id: ObjectId, comment: CommentDBType): Promise<UpdateResult> {
        const findedComment = await commentsQueryRepository.findCommentById(id)
        const updates = {
            $set: {
                content: comment.content,
            }
        }
        const updatedComment = await commentCollection.updateOne({_id: findedComment?._id}, updates)
        return updatedComment
    },

    async deleteComment(id: ObjectId) {
        return await commentCollection.deleteOne({_id: id})
    }

}

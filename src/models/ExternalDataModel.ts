export class PostDataModel {
   id: number;
   userId: number;
   title: string;
   body: string
}

export class CommentDataModel {
   id: number;
   postId: number;
   name: string;
   email: string;
   body: string
}
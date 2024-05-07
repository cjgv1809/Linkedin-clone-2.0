"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ReactTimeago from "react-timeago";
import { Badge } from "./ui/badge";

function CommentFeed({ post }: { post: IPostDocument }) {
  const { user } = useUser();

  const isAuthor = user?.id === post.user.userId;

  return (
    <div className="space-y-2 mt-3">
      {post.comments?.map((comment) => (
        <div key={comment._id} className="flex space-x-1">
          <Avatar>
            <AvatarImage src={comment.user.userImage} />
            <AvatarFallback>
              {comment.user.firstName?.[0]}
              {comment.user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="bg-gray-100 px-4 py-2 rounded-md w-full">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">
                    {comment.user.firstName} {comment.user.lastName}
                  </p>
                  <Badge variant="outline">{isAuthor && "Author"}</Badge>
                </div>
                <p className="text-xs text-gray-400">
                  @{comment.user.firstName}
                  {comment.user.lastName}-
                  {comment.user.userId.toString().slice(-4)}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                <ReactTimeago date={new Date(comment.createdAt)} />
              </p>
            </div>

            <p className="mt-3 text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentFeed;

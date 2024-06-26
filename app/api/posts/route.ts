import connectDB from "@/mongodb/db";
import { IPostBase, Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  imageUrl?: string | null;
}

export async function POST(request: Request) {
  // protect the endpoint with Clerk authentication
  auth().protect();

  try {
    // connect to the database
    await connectDB();

    // get the post data from the request body
    const { user, text, imageUrl }: AddPostRequestBody = await request.json();

    // create the post data
    const postData: IPostBase = {
      user,
      text,
      ...(imageUrl && { imageUrl }),
    };

    // save the post to the database
    const post = await Post.create(postData);

    return NextResponse.json({ message: "Post created successfully", post });
  } catch (error: any) {
    return NextResponse.json(
      { error: `An error occurred while creating the post ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // connect to the database
    await connectDB();

    // get all posts from the database
    const posts = await Post.getAllPosts();

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json(
      { error: `An error occurred while fetching the posts ${error.message}` },
      { status: 500 }
    );
  }
}

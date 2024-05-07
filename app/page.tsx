import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import Widget from "@/components/Widget";
import { Button } from "@/components/ui/button";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const revalidate = 0;

export default async function Home() {
  await connectDB();

  const posts = await Post.getAllPosts();

  // console.log(posts);

  return (
    <div className="grid grid-cols-8 gap-2 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        {/* UserInformation */}
        <UserInformation posts={posts} />
        <SignedOut>
          <div className="flex flex-col justify-center items-center bg-white rounded-lg border py-4">
            <p className="text-center text-gray-400 text-sm font-medium">
              You are not signed in
            </p>
            <h1 className="text-center text-lg font-semibold mt-2">
              Sign in to post
            </h1>
          </div>
        </SignedOut>
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        {/* PostForm */}
        <SignedIn>
          <PostForm />
        </SignedIn>
        {/* PostFeed */}
        <PostFeed posts={posts} />
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        {/* Widget */}
        <Widget />
      </section>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import createPostAction from "@/actions/createPostAction";
import { toast } from "sonner";

function PostForm() {
  const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;

    if (!text.trim()) {
      throw new Error("You must provide a post text");
    }

    setPreview(null);

    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.error("Error posting", error);
    }
  };

  return (
    <div className="mb-2">
      <form
        ref={ref}
        action={(formData) => {
          // Handle form submission with server action
          const promise = handlePostAction(formData);
          // Toast notification baaed on the promise above
          toast.promise(promise, {
            loading: "Posting...",
            success: "Post created successfully",
            error: "Failed to create post",
          });
        }}
        className="p-3 bg-white rounded-lg border"
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            {user?.id ? (
              <AvatarImage src={user?.imageUrl} />
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" />
            )}
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

          <button type="submit" hidden>
            Post
          </button>
        </div>

        {/* Preview conditional check */}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-60 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex items-center justify-end mt-2 space-x-2">
          <Button
            type="button"
            variant={preview ? "secondary" : "outline"}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className=" mr-2" size={16} color="currentColor" />
            {preview ? "Change" : "Add"} image
          </Button>

          {/* Add a remove preview button */}
          {preview && (
            <Button
              variant="outline"
              type="button"
              onClick={() => setPreview(null)}
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>

      <hr className="mt-2 border-gray-300" />
    </div>
  );
}

export default PostForm;

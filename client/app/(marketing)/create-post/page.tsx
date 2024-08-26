"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import api from "@/utils/api";

interface PostFormData {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
}

interface PostResponse {
  _id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function CreatePostPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      imageUrl: "",
    },
  });

  const createPost = async (post: PostFormData): Promise<PostResponse> => {
    const response = await api.post<PostResponse>("/create-posts", post);
    return response.data;
  };

  const mutation = useMutation<PostResponse, Error, PostFormData>({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully.");
      // router.push(`/posts/${data._id}`);
    },
    onError: (error: Error) => {
      toast.error("An error occurred while creating the post.");
    },
  });

  const onSubmit = (data: PostFormData) => {
    mutation.mutate(data);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // Implement your image upload logic here
    console.log("Uploading file:", file);
    return "https://placeholder-image-url.com";
  };

  if (mutation.error) {
    return <div>An error has occurred: {mutation.error.message}</div>;
  }

  return (
    <div>
      <div className="w-full text-3xl font-medium">Write a new post.</div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter post title" />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Textarea {...field} placeholder="Enter post description" />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">Content</Label>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    // <MdEditor
                    //   style={{ height: "400px" }}
                    //   renderHTML={(text) => mdParser.render(text)}
                    //   onChange={({ text }) => field.onChange(text)}
                    //   onImageUpload={handleImageUpload}
                    // />
                    <Textarea {...field} placeholder="Enter post content" />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="imageUrl">Cover Image URL</Label>
                <Controller
                  name="imageUrl"
                  control={control}
                  rules={{ required: "Cover image URL is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="url"
                      placeholder="Enter cover image URL"
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

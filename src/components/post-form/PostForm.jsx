import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  // this post will have id init
  // .$id is from appwrite
  // preffer file upload work first
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      // setting default values
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  // we extract userdata with help of useSelector react-router-dom
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      // redirecting user
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // upload file first
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userID: userData.$id,
        });
        //redirect user
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    //g-global match ,
    // search this pattern ,inside it []
    //^ is negate in regex
    // \d - digit , \s = space
    return "";
  }, []);

  // update slug value when the title changes  
  useEffect(() => {
    // Subscribing to changes in form fields
    const subscription = watch((value, { name }) => {
      // 'value' is the current state of the form fields
      // 'name' is the name of the field that changed

      // If the field that changed is 'title'
      if (name === "title") {
        // Update the 'slug' field based on the transformed 'title' value
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    // Cleanup function to unsubscribe from watching form field changes
    return () => {
      subscription.unsubscribe();
      // Helps in memory management by removing the subscription
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
         {...console.log(getValues("content"))}
          label="Context :"
          name="content"
          control={control} // we are getting all the control here i.e values here
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png,image/jpg, inage/jpeg, inage/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb--4">
            <img
              src={appwriteService.getFilepreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "Inactive"]}
          label="status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColour={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

// main advantage , for react hook from is that , we it can accept data in from .
// todo change submit,else,change file upload like in if

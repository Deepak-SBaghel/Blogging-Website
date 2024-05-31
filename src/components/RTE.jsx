import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  // control from react hook form
  // pass the whole control from there to from where called
  return (
    <div calssName="w-full">
      {label && <label calssName="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        // the caling mathod will have all the events , state , data , values etc
        // inform when , change in field
        render={({ field: { onChange } }) => (
          //write , which element to be rendered
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body{ font-family:Helventica,Arial,sans-serif; front-size:14px}",
            }}
            // same as the added in field 
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

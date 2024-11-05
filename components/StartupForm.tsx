"use client";
import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { PinRightIcon } from "@radix-ui/react-icons";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({}); //allow different strings withing this object
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValue = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        imageUrl: formData.get("imageUrl"),
        pitch: JSON.stringify(pitch),
      };

      await formSchema.parseAsync(formValue);

      const result = await createPitch(prevState, formData, pitch);

      if (result?.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });
        router.push(`/startup/${result?._doc?._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten()?.fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors?.title && <p className="startup-form_error">{errors?.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors?.description && (
          <p className="startup-form_error">{errors?.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />
        {errors?.category && (
          <p className="startup-form_error">{errors?.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="imageUrl" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="imageUrl"
          name="imageUrl"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors?.imageUrl && (
          <p className="startup-form_error">{errors?.imageUrl}</p>
        )}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          height={300}
          preview="edit"
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        <MDEditor.Markdown source={pitch} style={{ whiteSpace: "pre-wrap" }} />
        {errors?.pitch && <p className="startup-form_error">{errors?.pitch}</p>}
      </div>
      <Button disabled={isPending} type="submit" className="startup-form_btn">
        {isPending ? "Submitting..." : "Submit your pitch"}
        <PinRightIcon className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;

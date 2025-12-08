import { useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRef, useState } from "react";
import { useProjects } from "../../context/ProjectContent";
import { toast } from "react-toastify";
import axios from "axios";

const ProjectForm = ({ initialData, isEditMode = false, children }) => {
  const { createProject, updateProject } = useProjects();
  const [open, setOpen] = useState(false);

  const base_url = import.meta.env.VITE_API_URL;

  // Ref to directly access the file input element for image submission
  const imageInputRef = useRef(null);

  const defaultTags = initialData?.tags.join(" ") || "";

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      image: initialData?.image || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      tags: defaultTags,
      liveLink: initialData?.liveLink || "",
      githubRepo: initialData?.githubRepo || "",
      // Note: react-hook-form handles standard inputs well. For Shadcn Switch,
      // you typically use the Controller component, but for simplicity here,
      // we rely on the default value and form submission.
      featured: initialData?.featured || false,
    },
  });

  const onSubmit = async (data) => {
    // 1. Prepare FormData for file and text fields
    const formData = new FormData();

    const imageFile = imageInputRef.current?.files[0];

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (isEditMode && initialData?.image) {
      formData.append("existingImage", initialData.image);
    }

    const tagsArray = data.tags.split(" ").filter((tag) => tag.trim() !== "");

    // Append fields to FormData
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", tagsArray.join(" "));
    formData.append("liveLink", data.liveLink);
    formData.append("githubRepo", data.githubRepo);
    formData.append("featured", String(data.featured));

    try {
      // 3. CRUD Operation using FormData
      if (isEditMode && initialData?._id) {
        // Axios will automatically set Content-Type to multipart/form-data when submitting FormData
        await updateProject(initialData._id, formData);
      } else {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${base_url}/api/project/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
        }else {
          toast.error(res.data.message);
        }
        reset();
      }

      setOpen(false);
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Failed to ${isEditMode ? "update" : "create"} project.`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Form fields remain the same */}
          <div className="grid gap-2">
            <Label htmlFor="image-upload">
              {isEditMode ? "Change Image (Optional)" : "Project Image"}
            </Label>
            <Input
              id="image-upload"
              type="file"
              ref={imageInputRef} // Attach ref here
              accept="image/*"
            />
            {isEditMode && initialData?.image && (
              <p className="text-xs text-gray-500">
                Current image exists. Uploading a new file will replace it.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title", { required: true })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (Space Separated)</Label>
            <Input
              id="tags"
              {...register("tags")}
              placeholder="react tailwind node"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="liveLink">Live Link</Label>
            <Input id="liveLink" {...register("liveLink")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="githubRepo">GitHub Repo</Label>
            <Input id="githubRepo" {...register("githubRepo")} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="featured">Featured Project</Label>
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <Switch
                  id="featured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Create Project"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;

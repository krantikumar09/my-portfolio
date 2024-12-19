import { useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddProject = ({ token }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [featuredProject, setFeaturedProject] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("liveLink", liveLink);
      formData.append("githubRepo", githubRepo);
      formData.append("featured", featuredProject);
      formData.append("image", image);

      const res = await axios.post(
        `${backendUrl}/api/project/create`,
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
        clearFormData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormData = () => {
    setTitle("");
    setDescription("");
    setLiveLink("");
    setGithubRepo("");
    setImage("");
    setFeaturedProject(false);
  };

  return (
    <div>
      <Title heading="Add Project" />

      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-6 w-full max-w-md"
      >
        <div className="flex flex-col">
          <label htmlFor="image" className="text-base text-black mb-2">
            Upload image <span className="text-xsm text-red-700">*</span>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="text-base text-black mb-2">
            Enter title <span className="text-xsm text-red-700">*</span>
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            id="title"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc" className="text-black mb-2">
            Enter description <span className="text-xsm text-red-700">*</span>
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="desc"
            className="textarea textarea-bordered p-4 border text-base"
            placeholder="Type here"
            rows={5}
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="liveLink" className="text-base text-black mb-2">
            Enter live link <span className="text-xsm text-red-700">*</span>
          </label>
          <input
            onChange={(e) => setLiveLink(e.target.value)}
            value={liveLink}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            id="liveLink"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="githubLink" className="text-base text-black mb-2">
            Enter GitHub link
          </label>
          <input
            onChange={(e) => setGithubRepo(e.target.value)}
            value={githubRepo}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            id="githubLink"
          />
        </div>

        <div className="">
          <label className="flex items-center gap-3 cursor-pointer">
            <input onChange={(e) => setFeaturedProject(e.target.checked)}  checked={featuredProject} type="checkbox" className="checkbox" />
            <span className="label-text">Featured</span>
          </label>
        </div>

        <button className="btn cursor-pointer bg-black text-white py-2 px-4 border-none outline-none hover:bg-greenHover uppercase">
          add project
        </button>
      </form>
    </div>
  );
};

export default AddProject;

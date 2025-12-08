import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, ExternalLink, Github, CheckCircle } from "lucide-react";
import { useProjects } from "../../context/ProjectContent";
import { useAuth } from "../../context/AuthContext";
import ProjectForm from "./ProjectForm";

const ProjectCard = ({ key, project }) => {
  const { deleteProject, fetchProjects } = useProjects();
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteProject(project._id);
      await fetchProjects();
    } catch (error) {
      alert("Failed to delete project.");
    }
  };
  
  const rawTagString =
    project.tags && project.tags.length > 0 ? project.tags[0] : "";
  const processedTags = rawTagString
    .split(" ")
    .filter((tag) => tag.trim() !== "");


  return (
    <Card className="flex flex-col">
      <CardHeader>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-60 object-cover rounded-md mt-2"
          loading="lazy"
        />
      </CardHeader>

      <CardContent className="flex-grow">
        <CardTitle className="mb-4 flex gap-2">
          {project.title}{" "}
          {project.featured && (
            <Badge>{project.featured === true && "Featured"}</Badge>
          )}
        </CardTitle>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {processedTags.map((tag, index) => (
            <p
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4">
        <div className="flex gap-2">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
          <a
            href={project.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <Github className="w-4 h-4" />
            </Button>
          </a>
        </div>
        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex gap-2">
            <ProjectForm
              initialData={project}
              isEditMode
              onSuccess={fetchProjects}
            >
              <Button variant="secondary" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </ProjectForm>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the project **{project.title}**.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

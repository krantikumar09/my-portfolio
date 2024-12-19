import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log("Error fetching projects: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Title heading="All Projects" />

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Project</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {isLoading
              ? // Render skeleton placeholders while loading
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index}>
                      <th>
                        <Skeleton width={20} height={20} />
                      </th>
                      <td>
                        <Skeleton width={30} height={36} />
                      </td>
                      <td>
                        <h3>
                          <Skeleton width={150} height={20} />
                        </h3>
                        <p>
                          <Skeleton width={200} height={15} />
                        </p>
                        <div>
                          <Skeleton width={100} height={20} />
                        </div>
                      </td>
                      <td>
                        <Skeleton width={60} height={30} />
                      </td>
                    </tr>
                  ))
              : // Render actual data after loading
                projects.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        className="w-[30px] h-[36px] object-cover"
                        src={item.image}
                        alt={item.image}
                        loading="lazy"
                      />
                    </td>
                    <td>
                      <h3 className="text-md md:text-xl text-black font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-500 mb-3">
                        {item.description}
                      </p>
                      <div className="flex gap-3">
                        <a
                          className="underline text-sm text-black cursor-pointer"
                          href={item.liveLink}
                          target="blank"
                        >
                          <FontAwesomeIcon icon={faLink} /> Live link
                        </a>

                        <a
                          className="underline text-sm text-black cursor-pointer"
                          href={item.githubRepo}
                          target="blank"
                        >
                          GitHub Repository
                        </a>
                      </div>
                    </td>
                    <td className="flex gap-2">
                      <button className="btn btn-sm">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button className="btn btn-sm">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProjects;

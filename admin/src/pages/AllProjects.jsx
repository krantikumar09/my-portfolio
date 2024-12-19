import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const data = await getProjects();
    setProjects(data);
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
            {projects.map((item, index) => (
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
                      <FontAwesomeIcon icon={faLink}/> Live link
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
                  <button className="btn btn-sm"><FontAwesomeIcon icon={faPen}/></button>
                  <button className="btn btn-sm"><FontAwesomeIcon icon={faTrash}/></button>
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

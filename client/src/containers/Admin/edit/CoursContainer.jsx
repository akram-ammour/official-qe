import React,{useState,useRef,useEffect} from "react";
import { toast } from "react-toastify";
import { Cours } from "../../../components";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useLocation,useNavigate } from "react-router-dom";
const CoursContainer = () => {
  const {auth} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  
  const axios = useAxios()

    const [cours, setCours] = useState([]);
    const [infos, setInfos] = useState({});
    const [modules, setModules] = useState([]);
    const coursContainerRef = useRef(null);
    useEffect(()=>{
      document.title ="e-qe Admin Cours"
    },[])

    const handleSelects = (e) => {
      setInfos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const fetchModules = async () => {
      try {
        const response = await axios.get(
          `/modules/specific?Year=${infos.year}&Semester=${infos.semestre}`);
        setModules(response.data);
      } catch (error) {
        console.log(error);
        if(error?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

      }
    };

    const fetchCours = async () => {
      try {
        const response = await axios.get(
          `/courses/specific?moduleId=${infos.module}`
        );
        setCours([...response.data]);
        // console.log(response.data)
      } catch (error) {
        console.log(error);
        if(error?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

      }
    };
    useEffect(() => {
      if (infos.year && infos.semestre) {

        fetchModules();
        if (infos.module) {
          fetchCours();
        }
      }
      // console.log(infos)
    }, [infos]);
  
    const handleCancel = () => {
      setInfos({});
    };
  
    useEffect(() => {
      if (coursContainerRef.current) {
        // Scroll to the bottom whenever the cours state is updated
        coursContainerRef.current.scrollTop =
          coursContainerRef.current.scrollHeight;
      }
    }, [cours]);

    const postCours = async () => {
      try {
        const response = await axios.post(`/courses/`, {
          title: infos.Title,
          moduleId: infos.module,
        });
        if(response?.data?.status === 'success'){
          setCours((prev) => [...prev, response.data]);
          coursContainerRef.current.scrollTop =
          coursContainerRef.current.scrollHeight;
          setInfos({...infos,Title:""})
          toast.success(response?.data?.message)
        }
        else if(response?.data?.status === 'exists'){
          toast.error(response?.data?.message)
        }
      } catch (error) {
        console.log(error);
          if(error?.response?.status === 401){
            navigate("/signin",{state: {from:location},replace:true})
        }

      }
    }; 

    const handleSubmit = async () => {
      if (infos.module && infos.Title) {
        postCours();
      } else toast.error("be sure to enter all infos");
    };

    const handleKeys = async (e) =>{
        if (e.keyCode === 13) {
          // Enter key was pressed
          e.preventDefault(); // Prevent the default behavior (line break in contentEditable)
          await postCours(); 
        } else if (e.keyCode === 27) {
        // Escape key was pressed
        e.preventDefault(); // Prevent
        setInfos({...infos,Title:""})
      }
    }
  return (
    <div className="app__editcontainer-content_cours">
      <div className="app__editcontainer-content_cours-left">
        <h2>Ajouter des cours</h2>

        <select name="year" onChange={handleSelects} value={infos.year || ""}>
          <option value="">Selectionner une année</option>
          <option value="FIRST">1A</option>
          <option value="SECOND">2A</option>
          <option value="THIRD">3A</option>
          <option value="FOURTH">4A</option>
          <option value="FIFTH">5A</option>
        </select>
        <select
          name="semestre"
          onChange={handleSelects}
          value={infos.semestre || ""}
        >
          <option value="">Selectionner un semestre</option>
          <option value="SEMESTER1">semestre 1</option>
          <option value="SEMESTER2">semestre 2</option>
        </select>
        <select
          name="module"
          onChange={handleSelects}
          value={infos.module || ""}
        >
          <option value="">Selectionner un module</option>
          {modules.map((mod) => (
            <option key={mod?.Id} value={mod?.Id}>
              {mod?.Title}
            </option>
          ))}
        </select>
        <input
          onKeyDown={handleKeys}
          type="text"
          name="Title"
          placeholder="fill in with cours"
          value={infos.Title || ""}
          onChange={(e) =>
            setInfos((prev) => ({ ...prev, Title: e.target.value }))
          }
          autoFocus
        />
        <div className="app__editcontainer-content_cours-left_btns">
          <button onClick={handleCancel}>cancel</button>
          <button onClick={handleSubmit}>Add cours</button>
        </div>
      </div>
      <div className="vline"></div>
      <div className="app__editcontainer-content_cours-right">
        <h2>les cours du module </h2>
        <div
          ref={coursContainerRef}
          className="app__editcontainer-content_cours-right_container"
        >
          {cours.map((c) => (
            <Cours key={c?.Id} coursId={c?.Id} fetch={fetchCours}>
              {c?.title}
            </Cours>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursContainer;

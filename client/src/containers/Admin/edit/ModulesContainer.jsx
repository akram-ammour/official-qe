import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useLocation, useNavigate } from 'react-router-dom';

const ModulesContainer = () => {
  const {auth} = useAuth()
  const axios = useAxios()
  const location = useLocation()
  const navigate = useNavigate()

  const [moduleInfos, setModuleInfos] = useState({
    Id: null,
    Title: '',
    Year: '',
    Semester: '',
    Icon: '',
    isFree:false,
  });
  useEffect(()=>{
    document.title ="e-qe Admin Modules"
  },[])

  const [modules, setModules] = useState([]);
  const [buttonText, setButtonText] = useState('add');

  const handleData = (e) => {
    const { name, value } = e.target;
    setModuleInfos((prevModuleInfos) => ({
      ...prevModuleInfos,
      [name]: value,
    }));
  };
  const handleCheckBox = (e) =>{
    setModuleInfos((prevModuleInfos) => ({
      ...prevModuleInfos,
      ["isFree"]: e.target.checked,
    }));
  }
  const handleModuleSelect = (moduleId) => {
    if (moduleId) {
      const selectedModule = modules.find((mod) => mod.Id === moduleId);
      setModuleInfos(selectedModule);
      setButtonText('update');
    } else {
      setModuleInfos({
        Id: null,
        Title: '',
        Year: '',
        Semester: '',
        Icon: '',
        isFree: false
      });
      fetchModules()
      setButtonText('add');
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get('/modules');
      let mods = response.data.map((mod) => ({
        Id: mod.Id,
        Year: mod.Year,
        Semester: mod.Semester,
        Title: mod.Title,
        Icon: mod.Icon,
        isFree:mod.isFree
      }));
      mods = generateOptions(mods)

      setModules(mods);
    } catch (error) {
      console.log(error);
        if(error?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

    }
  };
  const EditModule = async () =>{
    if(!moduleInfos.Title || !moduleInfos.Icon || !moduleInfos.Semester || !moduleInfos.Year){
      toast.error("be sure to fill all fields")
      return
    }
    if(buttonText === "add"){
      if (modules.find(mod=> mod.Title.trim().toLowerCase() === moduleInfos.Title.trim().toLowerCase())){
        toast.error("module already in database")
        setModuleInfos({
          Id: null,
          Title: '',
          Year: '',
          Semester: '',
          Icon: '',
          isFree:false,
        });
        setButtonText('add');
        return
      }
      try{
        const response = await axios.post('/modules',{
          ...moduleInfos
        })
        if(response?.data?.status === "success"){
          toast.success("added successfully")
          fetchModules()
          setModuleInfos({
            Id: null,
            Title: '',
            Year: '',
            Semester: '',
            Icon: '',
            isFree: false,

          });
          setButtonText('add');
        }
      }
      catch(error){
        console.log(error)
        if(error?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

      }
    }
    else if (buttonText === "update"){
      try{
        const response = await axios.patch(`/modules/${moduleInfos.Id}`,{
          ...moduleInfos
        })
        if(response?.data?.status === "success"){
          toast.success("updated successfully")
          fetchModules()
        }
      }
      catch(error){
        console.log(error)
        if(error?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

      }
    }
  }
  function translateToNumber(str) {
    if ( typeof str === "string"){
      const lowerCaseStr = str?.toLowerCase();
      switch (lowerCaseStr) {
        case "first":
          return 1;
        case "second":
          return 2;
        case "third":
          return 3;
        case "fourth":
          return 4;
        case "fifth":
          return 5;
        default:
          return NaN; // Invalid input
      }
    }
    else{
      return str
    }
  }
  function generateOptions(dataArray) {
    const options = [];
    let prevYear = null;
    let prevSemester = null;

    dataArray.forEach((item) => {
      const currentYear = item.Year;
      const currentSemester = item.Semester;

      if (prevYear !== currentYear || prevSemester !== currentSemester) {
        const semesterValue = currentSemester === 'SEMESTER1' ? (translateToNumber(item.Year) * 2) - 1 : translateToNumber(item.Year) * 2
        options.push({ Id:null,Title:`S${semesterValue}`});

        prevYear = currentYear;
        prevSemester = currentSemester;
      }

      options.push(item);
    });

    return options;
  }

  return (
    <div className='app__editcontainer-content_modules'>
      <div className='container'>
        <select
          name='Id'
          value={moduleInfos.Module || ''}
          onChange={(e) => handleModuleSelect(Number(e.target.value))}
        >
          <option value=''>Select a Module</option>
          {modules.map((mod,index) => {

            
            return (
            <option key={index} value={Number(mod.Id)} disabled={!mod.Id}>
              {mod.Title}
            </option>
          )})}
        </select>
        <input
          type='text'
          name='Title'
          value={moduleInfos.Title}
          onChange={handleData}
          placeholder='write A module title'
          autoComplete='off'
        />
        <select name='Year' value={moduleInfos.Year} onChange={handleData}>
          <option value=''>Select a Year</option>
          <option value='FIRST'>1A</option>
          <option value='SECOND'>2A</option>
          <option value='THIRD'>3A</option>
          <option value='FOURTH'>4A</option>
          <option value='FIFTH'>5A</option>
        </select>
        <select name='Semester' value={moduleInfos.Semester} onChange={handleData}>
          <option value=''>Select a Semester</option>
          <option value='SEMESTER1'>Semester 1</option>
          <option value='SEMESTER2'>Semester 2</option>
        </select>
        <input
          type='text'
          name='Icon'
          value={moduleInfos.Icon}
          onChange={handleData}
          placeholder='Module icon'
          autoComplete='off'
        />
        <div className="checkbox-container">
          <input type="checkbox" name="isFree" checked={moduleInfos.isFree} onChange={handleCheckBox}/>
          <p>Free</p>
        </div>
        <a href="https://fonts.google.com/icons" target='_blank'>Click here to look for available icons</a>
        <div className='buttons-container'>
          <button onClick={EditModule}>{buttonText}</button>
          <button onClick={() => handleModuleSelect(null)}>Cancel</button>
        </div>
        <span className='material-symbols-outlined'>{moduleInfos.Icon}</span>
      </div>
    </div>
  );
};

export default ModulesContainer;

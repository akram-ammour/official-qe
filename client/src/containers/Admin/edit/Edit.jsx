// i need to make
//     ? Modules
//     ? cours
//     ? exams

import React, { useEffect, useRef, useState } from "react";
import "./edit.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cours from "../../../components/Admin/Cours";
import { NewCours } from "../../../components";
import CoursContainer from "./CoursContainer"
import ExamsContainer from "./ExamsContainer"
import ModulesContainer from "./ModulesContainer";
import SMContainer from "./SMContainer";

const Edit = () => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (index) => {
    setTab(index);
  };


  return (
    <div className="app__editcontainer">
      <div className="app__editcontainer-tabs">
        <div
          className={`app__editcontainer-tabs_tab ${tab === 0 ? "active" : ""}`}
          onClick={() => handleTabChange(0)}
        >
          Exams
        </div>
        <div className="app__editcontainer-tabs_divider"></div>
        <div
          className={`app__editcontainer-tabs_tab ${tab === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Modules
        </div>
        <div className="app__editcontainer-tabs_divider"></div>
        <div
          className={`app__editcontainer-tabs_tab ${tab === 2 ? "active" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          Cours
        </div>
        <div className="app__editcontainer-tabs_divider"></div>
        <div
          className={`app__editcontainer-tabs_tab ${tab === 3 ? "active" : ""}`}
          onClick={() => handleTabChange(3)}
        >
          Sous-module
        </div>
      </div>
      <div className="app__editcontainer-content">
        {tab === 0 && (
          <ExamsContainer/>
        )}
        {tab === 1 && <ModulesContainer/>}
        {tab === 2 && (
          <CoursContainer/>
        )}
        {tab === 3 && (
          <SMContainer/>
        )}
      </div>
    </div>
  );
};

export default Edit;

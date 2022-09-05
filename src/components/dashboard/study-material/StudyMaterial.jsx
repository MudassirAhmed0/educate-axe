import React, { useState } from "react";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { dbase } from "../../../firebase";
import MaterialsComponent from "./MaterialsListComponent";
import { Link } from "react-router-dom";

const StudyMaterial = ({ studyMaterial, classroomId, setMaterials,fetchStudyMaterials,isTeacher }) => {
  const [dateCreated, setDateCreated] = useState("");
  function toDateTime() {
    let normalDate = new Date(studyMaterial.timestamp.seconds);
    let splitted = normalDate.toString().split(" ");
    setDateCreated(splitted[1] + " " + splitted[2] + ", " + splitted[3]);
  }
  useEffect(() => {
    toDateTime();
  }, []);

  const deleteMaterial = async () => {
    const docRef = doc(
      dbase,
      "Classrooms",
      classroomId,
      "StudyMaterialTopic",
      studyMaterial.id
    );
    deleteDoc(docRef)
    .then(()=>{
        
        fetchStudyMaterials()
    }) 
    ;
  };

  return (
    <div className="p-[24px] rounded-[8px] bg-[#f5f5f5] w-[100%] max-w-[800px] cursor-pointer"
    >
      <div className="flex border-b pb-[16px] justify-between flex-col gap-y-[15px]">
      <Link
      to={`/dashboard/study-material/study-material-list?classroomId=${classroomId}&studyMaterialTopicId=${studyMaterial.id}&studyMaterialTopicName=${studyMaterial.name}`}
       className="flex">
          <DescriptionIcon color="primary" fontSize="large" />
          <span className="text-[20px] ml-4 ">{studyMaterial.name}</span>
        </Link>
        {isTeacher && <div className="  flex gap-x-2 ml-auto">
          <Button color="error" variant="outlined" className="relative z-[5]" onClick={deleteMaterial}>
            Delete
          </Button>
          {/* <Button color="primary" variant="outlined">
            Edit
          </Button> */}
        </div>}
      </div>
      <div className="flex gap-x-2 mt-4 items-center text-[14px] text-gray-400">
        <ScheduleIcon color="primary" />
        <span>{dateCreated}</span>
      </div>
    </div>
  );
};

export default StudyMaterial;

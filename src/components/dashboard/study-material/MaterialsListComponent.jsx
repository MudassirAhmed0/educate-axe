import React, { useEffect, useState } from "react";
import Material from "./Material";
import { useLocation, useSearchParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbase } from "../../../firebase";
import Layout from "../../layout/Layout";
import MaterialDialog from "./MaterialDialog";
import Bookmarks from "../../common/Bookmarks";

const MaterialsListComponent = () => {
  const [materials, setMaterials] = useState([]);
  const [classroomId, setClassroomId] = useState("");
  const [studyMaterialTopicId, setStudyMaterialTopicId] = useState("");
  const [materialName,setMaterialName]= useState('')
  const [currentImgSrc, setCurrentImgSrc] = useState(null);
  const [isPDF, setIsPDF] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let splittedLocation = location.search.split("&");
    let newClassRoomId = splittedLocation[0].replace("?classroomId=", "");
    let newStudyMaterialTopicId = splittedLocation[1].replace(
      "studyMaterialTopicId=",
      ""
    );
    let newTopicName= splittedLocation[2].replace(
      "studyMaterialTopicName=",
      ""
    );
    setClassroomId(newClassRoomId);
    setStudyMaterialTopicId(newStudyMaterialTopicId);
    setMaterialName(decodeURI(newTopicName) )
  }, [location]);

  useEffect(() => {
    const fetchMaterailDetails = async () => {
      const q = query(
        collection(dbase, "Classrooms", classroomId, "StudyMaterial"),
        where("studyMaterialTopicId", "==", studyMaterialTopicId)
      );

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });

      setMaterials([...data]);
    };
    classroomId && studyMaterialTopicId && fetchMaterailDetails();
  }, [materials, classroomId, studyMaterialTopicId]);

  return (
    <>
      <Layout>
        <Bookmarks
          bookmarks={[["Dashboard", "/dashboard"], ["Study Material","/dashboard/study-material"],[materialName]]}
          container={"w-[100%] max-w-[800px]   mx-auto"}
        />

        <section className="container flex flex-col items-center min-h-[60vh] py-[32px]">
          <h2 className='text-[40px]   text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[0px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
            Study Material
          </h2>
          <div className="mt-8 w-full gap-y-4 max-w-[800px] flex justify-between flex-wrap">
            {materials?.map((item) => (
              <Material
                setIsPDF={setIsPDF}
                setCurrentImgSrc={setCurrentImgSrc}
                key={item.id}
                material={item}
              />
            ))}
          </div>
        </section>
      </Layout>
      {currentImgSrc && (
        <MaterialDialog
          imgSrc={currentImgSrc}
          isPDF={isPDF}
          setCurrentImgSrc={setCurrentImgSrc}
        />
      )}
    </>
  );
};

export default MaterialsListComponent;

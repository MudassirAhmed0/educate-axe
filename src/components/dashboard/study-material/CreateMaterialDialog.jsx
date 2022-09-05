import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { TextField } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { dbase, storage } from "../../../firebase";
import {
  setDoc,
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CreateMaterialDialog({ btnText,classroomId ,fetchClasses}) {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [state, setState] = React.useState({
    name: "",
    description: "",
  });

  const [nameError, setNameError] = React.useState(false);
  // const [descriptionError, setDescriptionError] = React.useState(false);
  const [fileError, setFileError] = React.useState(false);

  const handleFileChange = (e) => {
    const currentFile = e.target.files;
    const selectedFiles = Array.from(currentFile);


    setFiles((prev) => {
      let allFiles = [...prev, ...selectedFiles];
      let uniqueFiles = [];
      allFiles.map((file) => {
        let isDuplicated = false

        if (uniqueFiles.length > 0) {
          uniqueFiles.map((f) => {
            if (file.name === f.name) {
              isDuplicated = true
            }
          });
          isDuplicated || uniqueFiles.push(file)
        } else {
          uniqueFiles.push(file);
        }
      });
      return [...uniqueFiles];
    });
    setFileError(false);
  };
  const fileRemoveHandler = (name) => {
    const filteredFiles = files.filter(file => file.name !== name);
    setFiles(filteredFiles)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const submitHandler = async (e) => {

    console.log('submitHandler called');


    e.preventDefault();
    state.name == "" ? setNameError(true) : setNameError(false);
    files == "" ? setFileError(true) : setFileError(false);

    if (state.name !== '' && files !== true) {
      console.log("yes not empty gg")

      let StudyMaterialTopicData = {
        name: state.name,
        description: state.description,
      }


      const id = generateRandomId()
      const id2 = generateRandomId()
      const doccRef = doc(dbase, `Classrooms/${classroomId}/StudyMaterialTopic`, id);



      console.log('files', files);

      setDoc(doccRef, {
        name: state.name,
        description: state.description,
        id: id,
        timestamp: serverTimestamp(),
      })
        .then(res => {
          console.log('StudyMaterialTopic created')

          files.map((img) => {
            let _id = generateRandomId();
            const docccRef = doc(dbase, `Classrooms/${classroomId}/StudyMaterial`, _id);
            console.log('img', img)
            setDoc(docccRef, {
              download: [],
              id: _id,
              liked: [],
              name: img.name,
              studyMaterialLink: `Classrooms/${classroomId}/study_material/images/${img.name}`,
              studyMaterialType: img.type,
              studyMaterialTopicId: id,
              timestamp: serverTimestamp(),
            })

          })


          files.map((image) => {
            const imageRef = ref(storage, `Classrooms/${classroomId}/study_material/images/${image.name}`)
            uploadBytes(imageRef, image).then(() => {
              console.log('image upload');
            })
          })



        }).then(()=>{
          setFiles([])
          setState({
            name: "",
            description: "",
          })
          handleClose()
          fetchClasses()
        })
        .catch(err => {
          console.log('err', err)
        })

      //  try {
      //   const response = await setDoc(doccRef, {
      //     name: state.name,
      //     description: state.description,
      //     id: id,
      //     timestamp: serverTimestamp(),
      //   })
      //   console.log('response',response);
      // } catch (error) {
      //   console.log('error',error);
      // }

    }
  };
  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000000000).toString()
  }
  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: "200px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={handleClickOpen}
      >
        Create Material
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create Study Material
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="  w-[70vw] max-w-[70vh] md:w-auto  sm:min-w-[500px]">
            <div className="flex flex-col gap-y-[16px]">
              <form onSubmit={submitHandler}>
                <TextField
                  fullWidth
                  id="name"
                  label="Enter Folder Name"
                  variant="outlined"
                  value={state.name}
                  required
                  onChange={handleChange}
                />
                {nameError ? (
                  <p className="text-[11px] text-[rgba(0,0,0,0.8)]  relative top-[-8px] mt-[12px] mb-[2px]">
                    Please enter your 'Name'
                  </p>
                ) : (
                  <p className="text-[11px] text-[rgba(0,0,0,0.8)] relative top-[-8px] mt-[12px] mb-[2px]">
                    'Eg: English Notes'
                  </p>
                )}
                <TextField
                  fullWidth
                  id="description"
                  label="Description (Optional)"
                  variant="outlined"
                  value={state.description}
                  onChange={handleChange}
                />

                <Button
                  variant="contained"
                  component="label"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "12px",
                    marginTop: "12px",
                  }}
                >
                  Add Attachment
                  <AttachmentIcon />
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="application/pdf,image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {!fileError ? (
                  <ul className="flex gap-[8px] flex-wrap mt-[5px]  ">
                    {files.map((file) => {
                      return (
                        <li
                          key={file.name}
                          className="border text-[rgba(0,0,0,0.8)] bg-white pt-[6px] pb-[6px] pl-[7px] pr-[7px] text-sm cursor-pointer"
                          onClick={() => { fileRemoveHandler(file.name) }}
                        >
                          {file.name}
                          <i
                            className="fa fa-times relative bottom-[17px] left-[3px] top-[2px]  text-[rgba(0,0,0,0.8)]"
                            aria-hidden="true"
                          ></i>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-[11px] text-[rgba(0,0,0,0.8)] relative top-[-8px] mt-[12px] mb-[2px]">
                    'Image not selected'
                  </p>
                )}
              </form>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Share
          </Button>

          <Button autoFocus variant="contained" onClick={submitHandler}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

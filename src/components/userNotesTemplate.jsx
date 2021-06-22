import { connect } from "react-redux";
import { useState } from "react";
import Masonry from 'react-masonry-css';
import {HiOutlinePencilAlt} from 'react-icons/hi';
import {TiDeleteOutline} from 'react-icons/ti';
import {IoIosAddCircleOutline} from 'react-icons/io';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useRef } from "react";

const StyleModal = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
}));

const UserNotes = ({yoursNotes,AddNewNote,DeleteNote,changeNote}) => {
    const [ TittleNote , SetTittleNote ] = useState("");
    const [ Note , SetNote ] = useState("");
    const [ TittleChange, setTittleChange] = useState("");
    const [ NoteChange, setNoteChange] = useState("");
    const [ idNote, setIdNote] = useState("");
    const [ openAddNote, setOpenAddNote ] = useState(false);
    const [ openEditNote, setOpenEditNote ] = useState(false);

    const classes = StyleModal();

    const handleTittleNote = (event) =>{
        const tittle = event.target.value;
        SetTittleNote(tittle);
    }

    const handleNote = (event) =>{
        const note = event.target.value;
        SetNote(note);
    }

    const addNotes = (event) =>{
        event.preventDefault();
        if(TittleNote==="" || Note===""){
            console.log("Debes llenar todos los campos para registrar nota")
        }else{
            const data = {
                id: yoursNotes.length+1,
                noteTittle:TittleNote,
                noteBody:Note
            }
            AddNewNote(data);
            setOpenAddNote(false);
            SetTittleNote("");
            SetNote("")
        }
    }

    const deleteNote = (idNote) => {
        DeleteNote(idNote)
    }

    const UpdateNote = (tittleNote,BodyNote,idNote) => {
        setOpenEditNote(true);
        setTittleChange(tittleNote);
        setNoteChange(BodyNote);
        setIdNote(idNote);
    }

    const HandleEditTittle = (event) => {
        const tittle = event.target.value
        setTittleChange(tittle)
    }

    const HandleEditNote = (event) => {
        const note = event.target.value
        setNoteChange(note)
    }

    const HandleOpenAddNote = () => {
        setOpenAddNote(true)
    }

    const EditNote = (event) => {
        event.preventDefault();
        if(TittleChange==="" || NoteChange===""){
            console.log("Se tienen que llenar todos los campos para continuar")
        }else{
            changeNote(idNote,TittleChange,NoteChange)
            setNoteChange("");
            setTittleChange("");
            setOpenEditNote(false);
        }
    }

    return(
        <>
        <div className="Container-Button-AddNote">
            <button className="Button-AddNote" onClick={() => HandleOpenAddNote()}>
                <IoIosAddCircleOutline className="Add-icon"/>
                <div>Agregar Nota</div>
            </button>
        </div>
        <Masonry
              breakpointCols={3}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
        >
            {
                yoursNotes.map((notes,i) => {
                    return(
                        <div key={i} className="Card-Container">
                            <div className="Card-Menu-Container">
                                <h4>{notes.noteTittle}</h4>
                                <div className="Container-Icons-Note">
                                    <TiDeleteOutline className="Delete-icon-Note" onClick={() => deleteNote(notes.id)}/>
                                    <HiOutlinePencilAlt className="Edit-icon-Note" onClick={() => UpdateNote(notes.noteTittle,notes.noteBody,notes.id)}/>
                                </div>
                            </div>
                            <div className="Body-Container-Card">
                                <p>{notes.noteBody}</p>
                            </div>
                        </div>
                    )
                }).reverse()
            }
        </Masonry>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAddNote}
        onClose={()=>setOpenAddNote(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAddNote}>
          <div className="Card-Form-Add">
            <div className="Close-Button-Modal" onClick={()=>setOpenAddNote(false)}>
                X
            </div>
            <div className="Container-Form-Add-Note">
                <div className="Intro-Tittle-Container-Add-Note">
                    <IoIosAddCircleOutline className="Add-Icon-InForm"/>
                    <div className="Tittle-AddNote">Agregar Nota</div>
                </div>
                <form onSubmit={addNotes}>
                    <div className="Space-Between">
                        <label htmlFor="TittleNote" className="Style-Labels-Forms">Titulo de la Nota</label>
                    </div>
                    <input required type="text" id="TittleNote" className="Inputs-Forms" onInput={handleTittleNote} value={TittleNote} placeholder="Ingresa Titulo"/>
                    <div className="Space-Between">
                        <label htmlFor="Nota" className="Style-Labels-Forms">Cuerpo de la Nota</label>
                    </div>
                    <textarea required id="Nota" cols="30" rows="10" className="Text-Area-Notes" onInput={handleNote} value={Note} placeholder="Ingresa el Cuerpo"/>
                    <div className="Input-Submit-AddNote">
                        <input className="Button-AddNote-Card" type="submit" value="Añadir nota"/>
                    </div>
                </form>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openEditNote}
        onClose={()=>setOpenEditNote(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Fade in={openEditNote}>
            <div className="Card-Form-Add">
                <div className="Close-Button-Modal" onClick={()=>setOpenEditNote(false)}>
                    X
                </div>
                <div className="Container-Form-Add-Note">
                    <div className="Intro-Tittle-Container-Add-Note">
                        <IoIosAddCircleOutline className="Add-Icon-InForm"/>
                        <div className="Tittle-AddNote">Editar Nota</div>
                    </div>
                    <form onSubmit={EditNote}>
                        <div className="Space-Between">
                            <label htmlFor="TittleNote" className="Style-Labels-Forms">Titulo de la Nota</label>
                        </div>
                        <input required type="text" id="TittleNote" className="Inputs-Forms" onInput={HandleEditTittle} value={TittleChange} placeholder="Ingresa Titulo"/>
                        <div className="Space-Between">
                            <label htmlFor="Nota" className="Style-Labels-Forms">Cuerpo de la Nota</label>
                        </div>
                        <textarea required id="Nota" cols="30" rows="10" className="Text-Area-Notes" onInput={HandleEditNote} value={NoteChange} placeholder="Ingresa el Cuerpo"/>
                        <div className="Input-Submit-AddNote">
                            <input className="Button-AddNote-Card" type="submit" value="Añadir nota"/>
                        </div>
                    </form>
                </div>
            </div>
          </Fade>
      </Modal>
    </>
    )
}

const mapStateToProps = (state) => ({
    yoursNotes: state.yoursNotes,
})

const mapDispatchToProps = (dispatch) => ({
    AddNewNote(note){
        dispatch({
            type: "ADD_NOTE",
            newNote:note
        })
    },
    DeleteNote(noteId){
        dispatch({
            type: "DELETE_NOTE",
            noteDelete:noteId
        })
    },
    changeNote(id,noteTittle,noteBody){
        dispatch({
            type: "UPDATE_NOTE",
            note:{
                id,
                noteTittle,
                noteBody
            }
        })
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(UserNotes);
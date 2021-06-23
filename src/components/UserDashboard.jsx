import { connect } from "react-redux";
import { useEffect } from 'react';
import UserNotes from "./userNotesTemplate";
import {BsCheckBox} from 'react-icons/bs';
import {FiMessageSquare} from 'react-icons/fi';
import {VscMail} from  'react-icons/vsc';
import {AiOutlineCalendar} from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai';
import {FiPower} from 'react-icons/fi';
import {Link} from "react-router-dom";

const UserDashBoard = ({LogedUser,showNotesDB}) => {
    const detectNameUser = `${LogedUser.name}`;

    useEffect(()=>{
        showNotesDB(LogedUser._id)
    },[])

    const offSession = () =>{
        window.location.reload()
    }

    return (
        <>
            <div className="Dashboard-Panel-Notes">
                    <div className="Menu-Container-DashBoard">
                        <div className="Container-icons">
                            <BsCheckBox className="Icons-In-Bar"/>
                            <FiMessageSquare className="Icons-In-Bar"/>
                            <VscMail className="Icons-In-Bar"/>
                            <AiOutlineCalendar className="Icons-In-Bar"/>
                            <AiOutlineStar className="Icon-Star"/>
                        </div>
                        <div className="User-Session-Container">
                            <h1 className="Tittle-User">
                                {detectNameUser}
                            </h1>
                            <Link className="Close-Session" to="/" onClick={()=>offSession()}>
                                <FiPower className="Icon-Close-Session"/>
                            </Link>
                        </div>
                    </div>
                    <div className="Notes-Container">
                        <UserNotes/>
                    </div>
                </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    LogedUser: state.LogedUser
})

const mapDispatchToProps = (dispatch) => ({
    showNotesDB(idUser){
        dispatch({
            type:"SHOW_MY_NOTES",
            userId:idUser
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(UserDashBoard);
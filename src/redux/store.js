import { createStore } from "redux";

const initialState = {
    LogedUser: {
        _id:"01",
        name:"dd",
        loged:false
    },
    UserToken:"",
    MartinNotes:[
        {   id:1,
            noteTittle:"Pellentesque tincidunt",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:2,
            noteTittle:"Lorem ipsum dolor",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:3,
            noteTittle:"Lorem ipsum dolor sit, amet.",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:4,
            noteTittle:"Lorem ipsum",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:5,
            noteTittle:"Lorem",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
    ],
   AndresNotes:[
        {
            id:1,
            noteTittle:"Pellentesque tincidunt",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:2,
            noteTittle:"Lorem ipsum dolor",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:3,
            noteTittle:"Lorem ipsum dolor sit, amet.",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:4,
            noteTittle:"Lorem ipsum",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:5,
            noteTittle:"Lorem",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:6,
            noteTittle:"Lorem",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
        {
            id:7,
            noteTittle:"Lorem",
            noteBody:"Lorem ipsum dolor sit amet consectetur adipiscing elit metus, laoreet dapibus curae mollis taciti aenean ligula maecenas magnis, semper porttitor bibendum tortor nec imperdiet purus. Suspendisse potenti mauris risus per sodales vivamus montes, torquent odio quam gravida enim orci id, iaculis eget etiam magna vulputate himenaeos vehicula"
        },
    ],
    yoursNotes:[],
    selectNoteEdit:{
        id:"",
        noteTittle:"",
        noteBody:""
    }
}

const reducerService = (state = initialState, action) => {
    if(action.type === "LOGED_USER"){
        return{
            ...state,
            LogedUser: action.LogedUser
        }
    }else if(action.type === "SHOW_MY_NOTES"){
        const martinNotes = state.MartinNotes;
        const andresNotes = state.AndresNotes;
        if(action.userId === 0){
            return{
                ...state,
                yoursNotes: state.yoursNotes.concat(martinNotes)
            }
        }else{
            return{
                ...state,
                yoursNotes: state.yoursNotes.concat(andresNotes)
            }
        }
    }else if(action.type === "PASSWORD_RECOVERY"){
        return{
            ...state,
            UserToken:action.token
        }
    }else if(action.type === "ADD_NOTE"){
        return{
            ...state,
            yoursNotes: state.yoursNotes.concat(action.newNote)
        }
    }else if(action.type === "DELETE_NOTE"){
        return{
            ...state,
            yoursNotes: state.yoursNotes.filter(note => note.id !== action.noteDelete)
        }
    }else if(action.type === "UPDATE_NOTE"){
        state.yoursNotes[action.note.id-1]=action.note
        console.log(state.yoursNotes);
        return{
            ...state,
            yoursNotes:state.yoursNotes
        }
    }
    return state
}

export default createStore(reducerService);
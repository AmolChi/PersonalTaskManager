import { User, UserState, Task } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  users: [],
  activeUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.activeUser = action.payload;
    },
    addActiveUser: (state, action: PayloadAction<User>) => {
      state.activeUser = action.payload;
    },
    removeActiveUser: (state) => {
      if (state.activeUser) {
        console.log(state.users)
        const index = -1;
        if(index!==-1)
            state.users[index] = state.activeUser;
        state.activeUser = null
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.activeUser?.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      if (state.activeUser) {
        const index = state.activeUser.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        state.activeUser.tasks[index] = action.payload;
      }
    },
    deleteTask: (state,action:PayloadAction<Task>)=>{
        if(state.activeUser){
            const index = state.activeUser.tasks.findIndex(
                task => task.id === action.payload.id
            )
            if(index !== -1){
                state.activeUser.tasks.splice(index,1);
            }
        }
    }
  },
});

export const { addUser, addActiveUser, removeActiveUser, updateTask, deleteTask, addTask } = userSlice.actions;
export const reducer = userSlice.reducer;

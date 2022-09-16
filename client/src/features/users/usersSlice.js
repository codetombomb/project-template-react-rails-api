import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const resp = await fetch("/users");
  const data = await resp.json();
  console.log(data);
  return data;
});

export const delUser = createAsyncThunk("users/deleteUser", async (user) => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await fetch(`/users/${user.id}`, config);
  const data = await resp.json();
  return data;
});

export const postUser = createAsyncThunk("users/postUser", async (user) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const resp = await fetch("/users", config);
  const data = await resp.json();
  return data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const resp = await fetch(`/users/${user.id}`, config);
  const data = await resp.json();
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    [delUser.pending]: (state, action) => {
      state.loading = true;
    },
    [delUser.fulfilled]: (state, action) => {
      state.loading = false;

      state.data = state.data.filter((user) => user.id !== action.payload.id);
    },
    [delUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [postUser.pending]: (state, action) => {
      state.loading = true;
    },
    [postUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [postUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = state.data.map((user) => {
        if (user.id === action.payload.id) {
          user = action.payload;
        }
      });
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

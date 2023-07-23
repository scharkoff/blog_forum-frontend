import React from 'react';

import { Route, Routes } from 'react-router-dom';
import {
  ActivatePage,
  AddPost,
  AdminPanel,
  EditUserData,
  FullPost,
  Home,
  Login,
  NotFoundPage,
  Profile,
  Registation,
} from 'pages';

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Registation />}></Route>
      <Route path="/activate/:link" element={<ActivatePage />}></Route>
      <Route path="/posts/:id" element={<FullPost />}></Route>
      <Route path="/posts/:id/edit" element={<AddPost />}></Route>
      <Route path="/add-post" element={<AddPost />}></Route>
      <Route path="/tags/:name" element={<Home />}></Route>
      <Route path="/profile/:id" element={<Profile />}></Route>
      <Route path="/admin-panel" element={<AdminPanel />}></Route>
      <Route
        path="/admin-panel/edit-user/:id"
        element={<EditUserData />}
      ></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

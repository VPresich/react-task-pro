import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ScreensPage = lazy(() => import('../pages/ScreensPage/ScreensPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route
          path="/welcome"
          element={
            <RestrictedRoute redirectTo="/" component={<WelcomePage />} />
          }
        />
        <Route
          path="/auth/login"
          element={<RestrictedRoute redirectTo="/" component={<AuthPage />} />}
        />
        <Route
          path="/auth/register"
          element={<RestrictedRoute redirectTo="/" component={<AuthPage />} />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/welcome" component={<HomePage />} />
          }
        />
        <Route
          path="/home/:boardName"
          element={
            <PrivateRoute redirectTo="/login" component={<ScreensPage />} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

// import { lazy, Suspense } from 'react';
// import { Routes, Route } from 'react-router-dom';

// import PrivateRoute from './PrivateRoute';
// import RestrictedRoute from './RestrictedRoute';

// const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));
// const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
// const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
// const ScreensPage = lazy(() => import('../pages/ScreensPage/ScreensPage'));
// const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

// const AppRouter = () => {
//   return (
//     //TODO Private and Restricted Route
//     <Suspense fallback={<div>Loading page...</div>}>
//       <Routes>
//         <Route
//           path="/welcome"
//           element={
//             <RestrictedRoute redirectTo="/" component={<WelcomePage />} />
//           }
//         />
//         <Route
//           path="/auth/:id"
//           element={<RestrictedRoute redirectTo="/" component={<AuthPage />} />}
//         />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute redirectTo="/welcome" component={<HomePage />} />
//           }
//         />
//         <Route
//           path="/home/:boardName"
//           element={
//             <PrivateRoute redirectTo="/login" component={<ScreensPage />} />
//           }
//         />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default AppRouter;

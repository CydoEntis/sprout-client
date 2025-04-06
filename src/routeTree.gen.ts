/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as ForgotPasswordImport } from './routes/forgot-password'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedAboutImport } from './routes/_authenticated/about'
import { Route as AuthenticatedTodayIndexImport } from './routes/_authenticated/today/index'
import { Route as AuthenticatedCategoriesIndexImport } from './routes/_authenticated/categories/index'
import { Route as AuthenticatedCalendarIndexImport } from './routes/_authenticated/calendar/index'
import { Route as AuthenticatedTaskListFavoritesImport } from './routes/_authenticated/task-list/favorites'
import { Route as AuthenticatedInviteInviteTokenImport } from './routes/_authenticated/invite/$inviteToken'
import { Route as AuthenticatedCategoriesFavoritesImport } from './routes/_authenticated/categories/favorites'
import { Route as AuthenticatedCategoriesCategoryNameImport } from './routes/_authenticated/categories/$categoryName'
import { Route as AuthenticatedCategoriesCategoryNameTaskListIdImport } from './routes/_authenticated/categories/$categoryName_/$taskListId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ForgotPasswordRoute = ForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedAboutRoute = AuthenticatedAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTodayIndexRoute = AuthenticatedTodayIndexImport.update({
  id: '/today/',
  path: '/today/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCategoriesIndexRoute =
  AuthenticatedCategoriesIndexImport.update({
    id: '/categories/',
    path: '/categories/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCalendarIndexRoute = AuthenticatedCalendarIndexImport.update(
  {
    id: '/calendar/',
    path: '/calendar/',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

const AuthenticatedTaskListFavoritesRoute =
  AuthenticatedTaskListFavoritesImport.update({
    id: '/task-list/favorites',
    path: '/task-list/favorites',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedInviteInviteTokenRoute =
  AuthenticatedInviteInviteTokenImport.update({
    id: '/invite/$inviteToken',
    path: '/invite/$inviteToken',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCategoriesFavoritesRoute =
  AuthenticatedCategoriesFavoritesImport.update({
    id: '/categories/favorites',
    path: '/categories/favorites',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCategoriesCategoryNameRoute =
  AuthenticatedCategoriesCategoryNameImport.update({
    id: '/categories/$categoryName',
    path: '/categories/$categoryName',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCategoriesCategoryNameTaskListIdRoute =
  AuthenticatedCategoriesCategoryNameTaskListIdImport.update({
    id: '/categories/$categoryName_/$taskListId',
    path: '/categories/$categoryName/$taskListId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/about': {
      id: '/_authenticated/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AuthenticatedAboutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/categories/$categoryName': {
      id: '/_authenticated/categories/$categoryName'
      path: '/categories/$categoryName'
      fullPath: '/categories/$categoryName'
      preLoaderRoute: typeof AuthenticatedCategoriesCategoryNameImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/categories/favorites': {
      id: '/_authenticated/categories/favorites'
      path: '/categories/favorites'
      fullPath: '/categories/favorites'
      preLoaderRoute: typeof AuthenticatedCategoriesFavoritesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/invite/$inviteToken': {
      id: '/_authenticated/invite/$inviteToken'
      path: '/invite/$inviteToken'
      fullPath: '/invite/$inviteToken'
      preLoaderRoute: typeof AuthenticatedInviteInviteTokenImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/task-list/favorites': {
      id: '/_authenticated/task-list/favorites'
      path: '/task-list/favorites'
      fullPath: '/task-list/favorites'
      preLoaderRoute: typeof AuthenticatedTaskListFavoritesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/calendar/': {
      id: '/_authenticated/calendar/'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof AuthenticatedCalendarIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/categories/': {
      id: '/_authenticated/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof AuthenticatedCategoriesIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/today/': {
      id: '/_authenticated/today/'
      path: '/today'
      fullPath: '/today'
      preLoaderRoute: typeof AuthenticatedTodayIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/categories/$categoryName_/$taskListId': {
      id: '/_authenticated/categories/$categoryName_/$taskListId'
      path: '/categories/$categoryName/$taskListId'
      fullPath: '/categories/$categoryName/$taskListId'
      preLoaderRoute: typeof AuthenticatedCategoriesCategoryNameTaskListIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedAboutRoute: typeof AuthenticatedAboutRoute
  AuthenticatedCategoriesCategoryNameRoute: typeof AuthenticatedCategoriesCategoryNameRoute
  AuthenticatedCategoriesFavoritesRoute: typeof AuthenticatedCategoriesFavoritesRoute
  AuthenticatedInviteInviteTokenRoute: typeof AuthenticatedInviteInviteTokenRoute
  AuthenticatedTaskListFavoritesRoute: typeof AuthenticatedTaskListFavoritesRoute
  AuthenticatedCalendarIndexRoute: typeof AuthenticatedCalendarIndexRoute
  AuthenticatedCategoriesIndexRoute: typeof AuthenticatedCategoriesIndexRoute
  AuthenticatedTodayIndexRoute: typeof AuthenticatedTodayIndexRoute
  AuthenticatedCategoriesCategoryNameTaskListIdRoute: typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedAboutRoute: AuthenticatedAboutRoute,
  AuthenticatedCategoriesCategoryNameRoute:
    AuthenticatedCategoriesCategoryNameRoute,
  AuthenticatedCategoriesFavoritesRoute: AuthenticatedCategoriesFavoritesRoute,
  AuthenticatedInviteInviteTokenRoute: AuthenticatedInviteInviteTokenRoute,
  AuthenticatedTaskListFavoritesRoute: AuthenticatedTaskListFavoritesRoute,
  AuthenticatedCalendarIndexRoute: AuthenticatedCalendarIndexRoute,
  AuthenticatedCategoriesIndexRoute: AuthenticatedCategoriesIndexRoute,
  AuthenticatedTodayIndexRoute: AuthenticatedTodayIndexRoute,
  AuthenticatedCategoriesCategoryNameTaskListIdRoute:
    AuthenticatedCategoriesCategoryNameTaskListIdRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/about': typeof AuthenticatedAboutRoute
  '/categories/$categoryName': typeof AuthenticatedCategoriesCategoryNameRoute
  '/categories/favorites': typeof AuthenticatedCategoriesFavoritesRoute
  '/invite/$inviteToken': typeof AuthenticatedInviteInviteTokenRoute
  '/task-list/favorites': typeof AuthenticatedTaskListFavoritesRoute
  '/calendar': typeof AuthenticatedCalendarIndexRoute
  '/categories': typeof AuthenticatedCategoriesIndexRoute
  '/today': typeof AuthenticatedTodayIndexRoute
  '/categories/$categoryName/$taskListId': typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

export interface FileRoutesByTo {
  '': typeof AuthenticatedRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/about': typeof AuthenticatedAboutRoute
  '/categories/$categoryName': typeof AuthenticatedCategoriesCategoryNameRoute
  '/categories/favorites': typeof AuthenticatedCategoriesFavoritesRoute
  '/invite/$inviteToken': typeof AuthenticatedInviteInviteTokenRoute
  '/task-list/favorites': typeof AuthenticatedTaskListFavoritesRoute
  '/calendar': typeof AuthenticatedCalendarIndexRoute
  '/categories': typeof AuthenticatedCategoriesIndexRoute
  '/today': typeof AuthenticatedTodayIndexRoute
  '/categories/$categoryName/$taskListId': typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/_authenticated/about': typeof AuthenticatedAboutRoute
  '/_authenticated/categories/$categoryName': typeof AuthenticatedCategoriesCategoryNameRoute
  '/_authenticated/categories/favorites': typeof AuthenticatedCategoriesFavoritesRoute
  '/_authenticated/invite/$inviteToken': typeof AuthenticatedInviteInviteTokenRoute
  '/_authenticated/task-list/favorites': typeof AuthenticatedTaskListFavoritesRoute
  '/_authenticated/calendar/': typeof AuthenticatedCalendarIndexRoute
  '/_authenticated/categories/': typeof AuthenticatedCategoriesIndexRoute
  '/_authenticated/today/': typeof AuthenticatedTodayIndexRoute
  '/_authenticated/categories/$categoryName_/$taskListId': typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/about'
    | '/categories/$categoryName'
    | '/categories/favorites'
    | '/invite/$inviteToken'
    | '/task-list/favorites'
    | '/calendar'
    | '/categories'
    | '/today'
    | '/categories/$categoryName/$taskListId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/about'
    | '/categories/$categoryName'
    | '/categories/favorites'
    | '/invite/$inviteToken'
    | '/task-list/favorites'
    | '/calendar'
    | '/categories'
    | '/today'
    | '/categories/$categoryName/$taskListId'
  id:
    | '__root__'
    | '/_authenticated'
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/_authenticated/about'
    | '/_authenticated/categories/$categoryName'
    | '/_authenticated/categories/favorites'
    | '/_authenticated/invite/$inviteToken'
    | '/_authenticated/task-list/favorites'
    | '/_authenticated/calendar/'
    | '/_authenticated/categories/'
    | '/_authenticated/today/'
    | '/_authenticated/categories/$categoryName_/$taskListId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  ForgotPasswordRoute: typeof ForgotPasswordRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  ForgotPasswordRoute: ForgotPasswordRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/forgot-password",
        "/login",
        "/register"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/about",
        "/_authenticated/categories/$categoryName",
        "/_authenticated/categories/favorites",
        "/_authenticated/invite/$inviteToken",
        "/_authenticated/task-list/favorites",
        "/_authenticated/calendar/",
        "/_authenticated/categories/",
        "/_authenticated/today/",
        "/_authenticated/categories/$categoryName_/$taskListId"
      ]
    },
    "/forgot-password": {
      "filePath": "forgot-password.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_authenticated/about": {
      "filePath": "_authenticated/about.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/categories/$categoryName": {
      "filePath": "_authenticated/categories/$categoryName.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/categories/favorites": {
      "filePath": "_authenticated/categories/favorites.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/invite/$inviteToken": {
      "filePath": "_authenticated/invite/$inviteToken.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/task-list/favorites": {
      "filePath": "_authenticated/task-list/favorites.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/calendar/": {
      "filePath": "_authenticated/calendar/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/categories/": {
      "filePath": "_authenticated/categories/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/today/": {
      "filePath": "_authenticated/today/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/categories/$categoryName_/$taskListId": {
      "filePath": "_authenticated/categories/$categoryName_/$taskListId.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */

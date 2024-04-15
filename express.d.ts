declare module "express-session" {
    export interface SessionData {
        user?: any,
      is_logined?: boolean;
      dispayName?: string;
      userId?: number;
    }
  }
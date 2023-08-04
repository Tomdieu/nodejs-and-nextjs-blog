'use client';
import { cn } from "@/lib/utils/cn";
import { Box, Grid } from "@mui/material";

type Prop = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Prop> = ({ children }) => {
  return (
    <Grid container height={'100vh'} width={'100vw'}>
      <Grid item lg={6} md={5} xs={0} className={cn("hidden lg:block md:block h-full w-full")}>
        <div className={cn('h-full w-full flex flex-col items-center justify-center')}>
          <h2 className="text-6xl font-bold font-sans mb-1">Nv Blog</h2>
          <p className="text-2xl sm:text-xl xs:text-xs text-center text-gray-500 font-sans">Share and gain experiences from others</p>
        </div>
      </Grid>
      <Grid item xs={12} lg={6} md={7} height={'100%'} className={cn("h-full w-full flex items-center justify-center")}>
      {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;

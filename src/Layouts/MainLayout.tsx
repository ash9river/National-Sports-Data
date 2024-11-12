
import Box from "@mui/material/Box";
import ClippedDrawer from "../Components/ClipDrawer/ClipDrawer";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Box sx={{ display: "flex" }}>
            <ClippedDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
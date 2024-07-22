import { AllGames } from "../components/AllGames";
import { AppBar } from "../components/AppBar";

export const DashBoard = () => {
    return (
        <div className="h-max bg-neutral-900">
            <AppBar name={"xlence"}/>
            <AllGames />
        </div>
    );
}
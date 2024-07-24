import { searchError } from "../atom";
import { useRecoilValue } from "recoil";

export const ErrorMessage = () => {
    const errorMessage = useRecoilValue(searchError);
    
    return errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>
}
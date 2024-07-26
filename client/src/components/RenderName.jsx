import axios from "axios";
import { useEffect, useState } from "react"
import { LightTooltip } from './Hovers';

export const RenderName = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        const handleName = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setName(response.data.username);
            } catch (error) {
                console.log("error fetching name: ", error);
            }
        }
        handleName();
    }, [])

    return (
        <div className="flex">
            <div className="cursor-default font-semibold flex flex-col justify-center mr-3 text-lg subpixel-antialiased font-normal tracking-tight hidden sm:flex">
                { ("hey there,").toUpperCase() }
            </div>
            <LightTooltip title={ name.toUpperCase() } arrow>
                <div className="cursor-pointer bg-zinc-900 h-10 w-10 flex justify-center rounded-full">
                    <div className="flex flex-col justify-center h-full text-xl font-bold">
                        { name ? name.toUpperCase()[0] : "" }
                    </div>
                </div>
            </LightTooltip>
        </div>
    );
}
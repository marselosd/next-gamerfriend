'use client';

import ProfileContentById from "@/components/contentProfile/ProfileContentById";
import { useGetUsuarioByIdQuery } from "@/components/header/userApi";
import { useParams } from "next/navigation";

export default function ProfileId() {
    const params = useParams();
    const id = Number(params.id);
    const {data,error,isLoading} = useGetUsuarioByIdQuery({id});

    if (isLoading) return <p>Loading...</p>
    if (error || !data) return <p>Something went wrong. Try again later.</p>

    return(
        <div className="bg-white min-h-screen py-6 px-4">
            <ProfileContentById user={data}/>
        </div>
    )
}
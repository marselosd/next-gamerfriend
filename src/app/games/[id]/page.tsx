'use client';

import SessionGuard from "@/app/SessionGuard";
import PageGame from "@/components/contentGames/PageGame";
import { useGetGameQuery } from "@/components/contentGames/gamesApi";
import { useParams } from "next/navigation";

export default function Game() {
    const params = useParams();
    const id = Number(params.id);
    const {data,error,isLoading} = useGetGameQuery({id});

    if (isLoading) return <p>Loading...</p>
    if (error || !data) return <p>Something went wrong. Try again later.</p>

    return(
        <>
        <SessionGuard>
            <PageGame game={data}/>
        </SessionGuard>
        </>
    )
}
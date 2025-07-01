'use client';

import { restoreSession } from "@/redux/features/authActions";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

export default function SessionStart() { 
    const dispatch = useAppDispatch();
      
        useEffect(() => {
          dispatch(restoreSession());
        }, []);

    return null;
}
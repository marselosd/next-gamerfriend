import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from 'react';
import { setUrl } from './ShareSlice';

interface CommonShareProps {
    shareUrl: string;
};

export default function CommonShare({shareUrl}: CommonShareProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUrl(shareUrl));
    }, [dispatch, shareUrl]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('Link copiado!');
        } catch {
            alert('Erro ao copiar.');
        }
    }

    return (
        <IconButton onClick={handleCopy} aria-label="share">
        <ShareIcon />
        </IconButton>
    );
}

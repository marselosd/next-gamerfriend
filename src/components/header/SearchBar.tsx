import { InputAdornment, List, ListItem, Paper, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState, useEffect, useRef } from "react";
import { useGetUsuarioByNameQuery } from "./userApi";
import { UserSearchBarPayload } from "@/types/interfaces/interfaces";
import Link from "next/link";

export default function SearchBar() {
  const [page] = useState(0);
  const [size] = useState(5);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useGetUsuarioByNameQuery({
    search: query,
    page,
    size,
  }, {
    skip: query.length === 0,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const usuarios = data ?? [];

  return (
    <div style={{ position: "relative", width: 300 }} ref={containerRef}>
      <TextField
        id="input-with-icon-textfield"
        label="Procurar Usuários"
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      {search.length > 0 && !isLoading && usuarios?.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <List>
            {usuarios?.map((user: UserSearchBarPayload) => (
                <Link href={`/profile/${user.idUsuario}`} key={user.idUsuario}>
                    <ListItem key={user.idUsuario}>
                        {user.login}
                    </ListItem>
                </Link>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

import React, { useCallback, useContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useHttp } from "../hooks/http.hook";
import LinkList from "../components/LinkList";
import { AuthContext } from "../context/AuthContext";

export const LinksPage = () => {
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState([]);

  const fetchLinks = useCallback(async () => {
    const fetched = await request("/api/link", "GET", null, {
      Authorization: `Bearer ${token}`
    });
    setLinks(fetched);
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <LinkList links={links} />}</>;
};

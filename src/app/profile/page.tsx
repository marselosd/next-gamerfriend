"use client";
import React from "react";
import ProfileContent from "@/components/contentProfile/ProfileContent";
import SessionGuard from "../SessionGuard";
import RequireAdmin from "@/components/admin/RequireAdmin";

export default function Profile() {
  return (
    <div className="bg-white min-h-screen py-6 px-4">
      <SessionGuard>
        <RequireAdmin>
          <ProfileContent />
        </RequireAdmin>
      </SessionGuard>
    </div>
  );
}

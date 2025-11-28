// src/pages/TravelProfilePage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";
import { FaUserFriends, FaGlobe, FaRegPaperPlane } from "react-icons/fa";
import { RiSuitcaseLine } from "react-icons/ri";

/* ----------------- Dummy user data ----------------- */
const DUMMY_USER = {
  name: "Aarav Mehra",
  location: "Rishikesh, India",
  description:
    "Adventure seeker · Photographer · Coffee lover. I explore remote trails, mountain sunsets and hidden waterfalls. Sharing genuine travel moments and local stories — one trip at a time.",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a1b8b7c6b2b1f2a9d8b6e9a9b6c3d1e",
  background:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5f8d6b1a3e3b2b9e1faed1f2b4c5d6e7",
  moments: [
    {
      id: 1,
      title: "Sunrise at Tiger Hill",
      text: "Woke up at 3AM, cold chai and a lifetime view.",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9c2d6a6b4e8b7f1a2d3c4b5e6f7a8c9d",
    },
    {
      id: 2,
      title: "Camps by the Ganges",
      text: "Felt small under the starry sky.",
      img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    },
  ],
  bucket: [
    "Trek to Kedarkantha",
    "Island hopping in Andaman",
    "Volcano sunrise in Bali",
  ],
  connections: 342,
};

/* ----------------- Component ----------------- */
export default function TravelProfilePage({ user = DUMMY_USER }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 moments,1 bucket,2 connections
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (e.key === "Escape") setOpenMenu(false);
    }
    function onClick(e) {
      // close when clicking outside the menu & button
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("keydown", onDoc);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onDoc);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const links = useMemo(
    () => [
      { id: 1, label: "Moments / Stories", icon: <RiSuitcaseLine />, tab: 0 },
      { id: 2, label: "My Bucket List", icon: <FaGlobe />, tab: 1 },
      { id: 3, label: "Connections", icon: <FaUserFriends />, tab: 2 },
    ],
    []
  );

  const handleMenuAction = (action) => {
    setOpenMenu(false);
    const current = links.find((l) => l.tab === activeTab);
    // Replace these alerts with navigation / API calls
    alert(`${action} → ${current?.label}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Background photo */}
      <div
        className="h-56 md:h-72 lg:h-96 bg-center bg-cover border-b"
        style={{
          backgroundImage: `url(${user.background})`,
          filter: "brightness(0.82)",
        }}
      />

      {/* Profile card overlapping background */}
      <div className="max-w-6xl mx-auto -mt-20 px-4 sm:-mt-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-xl shadow-xl p-5 md:p-8 flex flex-col md:flex-row gap-6 items-start"
        >
          {/* Avatar */}
          <div className="shrink-0 -mt-12 md:mt-0">
            <div className="relative">
              <div className="w-32 h-32 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full ring-4 ring-white overflow-hidden shadow-inner">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -left-3 -top-3 w-10 h-10 rounded-full border-2 border-yellow-400 bg-yellow-50 opacity-90" />
            </div>
          </div>

          {/* Main info */}
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#111827] flex items-center gap-3">
                  {user.name}
                  <span className="text-sm text-gray-500 font-medium">
                    · {user.location}
                  </span>
                </h2>
                <p className="mt-2 text-gray-600 text-sm max-w-3xl">
                  {truncateWords(user.description, 50)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded shadow hover:brightness-95 transition">
                  Message
                </button>
                {/* single 3-dot menu button */}
                <div className="shrink-0 relative">
                  <button
                    ref={menuButtonRef}
                    onClick={() => setOpenMenu((s) => !s)}
                    className="cursor-pointer flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow"
                    aria-expanded={openMenu}
                    aria-haspopup="true"
                    aria-controls="profile-links-menu"
                    title="More actions"
                  >
                    <FiMoreVertical className="w-5 h-5 text-gray-700" />
                  </button>

                  <AnimatePresence>
                    {openMenu && (
                      <motion.div
                        ref={menuRef}
                        id="profile-links-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-40"
                      >
                        <MenuItem
                          icon={<FaGlobe className="w-4 h-4 text-yellow-600" />}
                          label="Explore"
                          onClick={() =>
                            handleMenuAction("Explore", activeTab, links)
                          }
                        />
                        <MenuItem
                          icon={
                            <FaUserFriends className="w-4 h-4 text-yellow-600" />
                          }
                          label="Connect"
                          onClick={() =>
                            handleMenuAction("Connect", activeTab, links)
                          }
                        />
                        <MenuItem
                          icon={
                            <FaRegPaperPlane className="w-4 h-4 text-yellow-600" />
                          }
                          label="Message"
                          onClick={() =>
                            handleMenuAction("Message", activeTab, links)
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Links row with a single 3-dot menu on the right */}
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                  {links.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setActiveTab(l.tab)}
                      className={`flex items-center justify-between w-full bg-white border ${
                        activeTab === l.tab
                          ? "border-yellow-400 shadow"
                          : "border-gray-200"
                      } rounded-lg px-4 py-3 hover:shadow-md transition`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-yellow-600">{l.icon}</span>
                        <span className="font-medium text-gray-800">
                          {l.label}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500">
                        {l.id === 3 && `${user.connections} connections`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-6">
              {activeTab === 0 && (
                <div
                  id="moments"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {user.moments.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                      className="bg-gray-50 rounded-lg p-3 flex gap-3 items-start"
                    >
                      <img
                        src={m.img}
                        alt={m.title}
                        className="w-28 h-20 object-cover rounded"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          {m.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {m.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 1 && (
                <div
                  id="bucket"
                  className="bg-white border border-gray-300 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-800">
                    My Bucket List
                  </h4>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    {user.bucket.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 2 && (
                <div
                  id="connections"
                  className="bg-white border border-gray-300 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-800">Connections</h4>
                  <div className="mt-2 text-gray-700">
                    You have <strong>{user.connections}</strong> connections.
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ----------------- helpers ----------------- */

function truncateWords(txt = "", limit = 50) {
  const words = String(txt || "")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length <= limit) return txt;
  return words.slice(0, limit).join(" ") + "…";
}

function MenuItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-yellow-50 transition"
    >
      <span>{icon}</span>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}

function handleMenuAction(action, activeTab, links) {
  const current = links.find((l) => l.tab === activeTab);
  alert(`${action} → ${current?.label}`);
}

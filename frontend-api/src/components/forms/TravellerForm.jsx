import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { createPost } from "../../api/posts";

const GOLD = "#C59D5F";

const emptyLocation = { city: "", country: "", address: "" };

export default function TravellerForm() {
  const [mode, setMode] = useState("story"); // story | itinerary
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [caption, setCaption] = useState("");
  const [destination, setDestination] = useState("");
  const [planName, setPlanName] = useState("");
  const [priceTotal, setPriceTotal] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [location, setLocation] = useState(emptyLocation);

  const [photos, setPhotos] = useState([]); // {file, preview}
  const [videos, setVideos] = useState([]);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // cleanup previews
  useEffect(()=> {
    return ()=> {
      photos.forEach(p=>p.preview && URL.revokeObjectURL(p.preview));
      videos.forEach(v=>v.preview && URL.revokeObjectURL(v.preview));
    }
  }, [photos, videos]);

  const onDropPhotos = useCallback(acceptedFiles => {
    const mapped = acceptedFiles.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setPhotos(prev => [...prev, ...mapped]);
  }, []);

  const onDropVideos = useCallback(acceptedFiles => {
    const mapped = acceptedFiles.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setVideos(prev => [...prev, ...mapped]);
  }, []);

  const {
    getRootProps: getPhotoRootProps,
    getInputProps: getPhotoInputProps,
    isDragActive: isPhotoDrag
  } = useDropzone({ onDrop: onDropPhotos, accept: { 'image/*': [] }, multiple: true });

  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive: isVideoDrag
  } = useDropzone({ onDrop: onDropVideos, accept: { 'video/*': [] }, multiple: true });

  function removeMedia(idx, setter) {
    setter(prev => {
      const p = prev[idx]; if(p?.preview) URL.revokeObjectURL(p.preview);
      return prev.filter((_,i)=>i!==idx);
    });
  }

  function addTag() {
    const v = tagInput.trim(); if(!v) return setTagInput("");
    setTags(t => t.includes(v) ? t : [...t, v]);
    setTagInput("");
  }
  function removeTag(i) { setTags(t => t.filter((_,idx)=>idx!==i)); }

  function buildFormData() {
    const fd = new FormData();
    fd.append("postType", mode === "itinerary" ? "plan" : "experience");
    fd.append("userRole", "traveller");
    if (mode === "story") {
      fd.append("title", caption.slice(0,120));
      fd.append("description", caption);
    } else {
      fd.append("title", planName || destination);
      fd.append("planName", planName || destination);
      fd.append("priceTotal", priceTotal || 0);
      fd.append("pricePerPerson", pricePerPerson || 0);
      fd.append("maxPeople", maxPeople || 0);
      fd.append("location", JSON.stringify(location));
    }
    if (tags.length) fd.append("tags", JSON.stringify(tags));
    photos.forEach(p => fd.append("photos", p.file));
    videos.forEach(v => fd.append("videos", v.file));
    return fd;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const require = mode === "story" ? (caption.trim().length > 0 || photos.length > 0) : destination.trim().length > 0;
    if (!require) { alert("Please fill required fields."); return; }
    setLoading(true); setProgress(0);
    try {
      const fd = buildFormData();
      await createPost(fd, (evt) => { if(evt.total) setProgress(Math.round((evt.loaded*100)/evt.total)); });
      alert("Posted successfully");
      // reset
      setCaption(""); setPlanName(""); setDestination("");
      setPriceTotal(""); setPricePerPerson(""); setMaxPeople("");
      setTags([]); setPhotos([]); setVideos([]);
    } catch (err) {
      console.error(err); alert("Post failed — see console.");
    } finally { setLoading(false); setProgress(0); }
  }

  const canSubmit = mode === "story" ? (caption.trim().length>0 || photos.length>0) : destination.trim().length>0;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border border-gray-300 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: GOLD }}>Create Post</h2>
            <p className="text-sm text-gray-600">Share a memory, create an itinerary, or invite travellers.</p>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={()=>setMode("story")} className={`px-3 py-1 rounded cursor-pointer ${mode==="story" ? "bg-[#C59D5F] text-white" : "bg-white border border-gray-200"}`}>Story</button>
            <button type="button" onClick={()=>setMode("itinerary")} className={`px-3 py-1 rounded cursor-pointer ${mode==="itinerary" ? "bg-[#C59D5F] text-white" : "bg-white border border-gray-200"}`}>Itinerary</button>
          </div>
        </div>

        {mode==="story" ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Write something</label>
            <textarea value={caption} onChange={(e)=>setCaption(e.target.value)} rows={5} className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2" placeholder="Tell your story..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <input value={destination} onChange={(e)=>setDestination(e.target.value)} placeholder="Destination (e.g. Goa)" className="rounded-lg border border-gray-200 px-3 py-2" />
            <input value={planName} onChange={(e)=>setPlanName(e.target.value)} placeholder="Plan name (optional)" className="rounded-lg border border-gray-200 px-3 py-2" />
            <input type="number" value={priceTotal} onChange={(e)=>setPriceTotal(e.target.value)} placeholder="Goal amount" className="rounded-lg border border-gray-200 px-3 py-2" />
            <input type="number" value={pricePerPerson} onChange={(e)=>setPricePerPerson(e.target.value)} placeholder="Contribution per person" className="rounded-lg border border-gray-200 px-3 py-2" />
            <input type="number" value={maxPeople} onChange={(e)=>setMaxPeople(e.target.value)} placeholder="Max people" className="rounded-lg border border-gray-200 px-3 py-2" />
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>setShowAdvanced(s=>!s)} className="text-sm text-gray-700 cursor-pointer">Advanced</button>
              <div className="text-xs text-gray-500">Add location, tags & more</div>
            </div>
          </div>
        )}

        {/* Media dropzones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded p-3 border border-dashed">
            <label className="text-sm font-medium text-gray-700">Photos</label>
            <div {...getPhotoRootProps()} className={`mt-3 p-3 rounded border ${isPhotoDrag ? "border-[#C59D5F] bg-white" : "border-gray-200 bg-gray-50"} cursor-pointer`}>
              <input {...getPhotoInputProps()} />
              <div className="text-sm text-gray-600">Drag & drop images here, or click to select — up to multiple images.</div>
            </div>

            <div className="flex gap-2 mt-3 overflow-x-auto">
              {photos.map((p,i)=>(
                <div key={i} className="relative w-28 h-20 rounded overflow-hidden border border-gray-100">
                  <img src={p.preview} alt={p.file.name} className="w-full h-full object-cover" />
                  <button type="button" onClick={()=>removeMedia(i,setPhotos)} className="absolute top-1 right-1 bg-black/60 text-white rounded px-1 text-xs">x</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded p-3 border border-dashed">
            <label className="text-sm font-medium text-gray-700">Videos</label>
            <div {...getVideoRootProps()} className={`mt-3 p-3 rounded border ${isVideoDrag ? "border-[#C59D5F] bg-white" : "border-gray-200 bg-gray-50"} cursor-pointer`}>
              <input {...getVideoInputProps()} />
              <div className="text-sm text-gray-600">Drag & drop short videos (mp4/webm) or click to upload.</div>
            </div>

            <div className="flex gap-2 mt-3 overflow-x-auto">
              {videos.map((v,i)=>(
                <div key={i} className="relative w-40 h-28 rounded overflow-hidden border border-gray-100">
                  <video src={v.preview} className="w-full h-full object-cover" controls />
                  <button type="button" onClick={()=>removeMedia(i,setVideos)} className="absolute top-1 right-1 bg-black/60 text-white rounded px-1 text-xs">x</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* advanced */}
        {showAdvanced && (
          <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input value={location.city} onChange={(e)=>setLocation(l=>({...l,city:e.target.value}))} placeholder="City" className="rounded-lg border border-gray-200 px-3 py-2" />
              <input value={location.country} onChange={(e)=>setLocation(l=>({...l,country:e.target.value}))} placeholder="Country" className="rounded-lg border border-gray-200 px-3 py-2" />
              <input value={location.address} onChange={(e)=>setLocation(l=>({...l,address:e.target.value}))} placeholder="Meeting point" className="rounded-lg border border-gray-200 px-3 py-2" />
            </div>

            <div className="mt-3">
              <div className="flex gap-2">
                <input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} placeholder="Add tag" className="rounded-lg border border-gray-200 px-3 py-2 w-full" />
                <button type="button" onClick={addTag} style={{ background: GOLD }} className="px-3 py-2 rounded text-white cursor-pointer">Add</button>
              </div>

              <div className="flex gap-2 mt-3 flex-wrap">
                {tags.map((t,i)=>(
                  <div key={i} className="bg-white border border-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <span className="text-[#7a5d2a]">#{t}</span>
                    <button type="button" onClick={()=>removeTag(i)} className="text-xs text-red-500">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">Progress: {progress}%</div>
          <button
            type="submit"
            disabled={!canSubmit || loading}
            style={{ background: canSubmit && !loading ? GOLD : "#E6E6E6" }}
            className={`px-5 py-2 rounded-lg font-medium ${canSubmit && !loading ? "text-white" : "text-gray-500"}`}
          >
            {loading ? "Posting..." : mode==="story" ? "Post Story" : "Create Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}

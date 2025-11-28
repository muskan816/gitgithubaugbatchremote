// src/components/forms/HostForm.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const GOLD = "#C59D5F";

function validateDateRange(range) {
  if (!range.start || !range.end) return false;
  return new Date(range.start) <= new Date(range.end);
}

export default function HostForm({ onSaved }) {
  // Core fields (service-only)
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");

  // Packages: array of {id, name, price, durationDays, capacity, description}
//   const [packages, setPackages] = useState([]);

  // Availability: array of { id, start, end, notes }
  const [availability, setAvailability] = useState([]);

  // Booking rules
  const [bookingRules, setBookingRules] = useState({
    minBookingDays: "",
    maxBookingDays: "",
    bufferHours: "",
    advanceNoticeHours: "",
    cancellationPolicy: "Moderate (refund if canceled 48+ hours before)",
    maxGuestsPerBooking: ""
  });

  // Media
  const [media, setMedia] = useState([]); // {file, preview, type}

  // UX
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Dropzone
  const onDrop = useCallback(acceptedFiles => {
    const mapped = acceptedFiles.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image"
    }));
    setMedia(prev => [...prev, ...mapped]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: true
  });

  // revoke object URLs on cleanup
  useEffect(() => {
    return () => {
      media.forEach(m => m.preview && URL.revokeObjectURL(m.preview));
    };
  }, [media]);

  // package helpers
//   function addPackage() {
//     setPackages(p => [
//       ...p,
//       { id: Date.now(), name: "", price: "", durationDays: 1, capacity: 4, description: "" }
//     ]);
//   }
//   function updatePackage(id, patch) {
//     setPackages(p => p.map(pkg => (pkg.id === id ? { ...pkg, ...patch } : pkg)));
//   }
//   function removePackage(id) {
//     setPackages(p => p.filter(pkg => pkg.id !== id));
//   }

  // availability helpers
  function addAvailability() {
    setAvailability(a => [...a, { id: Date.now(), start: "", end: "", notes: "" }]);
  }
  function updateAvailability(id, patch) {
    setAvailability(a => a.map(x => (x.id === id ? { ...x, ...patch } : x)));
  }
  function removeAvailability(id) {
    setAvailability(a => a.filter(x => x.id !== id));
  }

  function removeMedia(idx) {
    setMedia(prev => {
      const m = prev[idx]; if (m?.preview) URL.revokeObjectURL(m.preview);
      return prev.filter((_, i) => i !== idx);
    });
  }

  // build form data for API
//   function buildFormData() {
//     const fd = new FormData();
//     fd.append("userRole", "host");
//     fd.append("mode", "service");
//     fd.append("title", title);
//     fd.append("shortDesc", shortDesc);
//     fd.append("longDesc", longDesc);

    // fd.append("packages", JSON.stringify(packages.map(p => ({
    //   name: p.name,
    //   price: p.price,
    //   durationDays: p.durationDays,
    //   capacity: p.capacity,
    //   description: p.description
    // }))));

//     fd.append("availability", JSON.stringify(availability.map(a => ({
//       start: a.start, end: a.end, notes: a.notes
//     }))));

//     fd.append("bookingRules", JSON.stringify(bookingRules));

//     media.forEach((m) => fd.append("media", m.file));

//     return fd;
//   }

  // basic validation
  const hasValidMinimal = () => {
    if (!title.trim()) return false;
    // if (packages.length === 0) return false;
    for (const r of availability) {
      if (!validateDateRange(r)) return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!hasValidMinimal()) {
      alert("Please fill required fields: title + at least one package and valid date ranges.");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
    //   const fd = buildFormData();
      // TODO: replace with your API call, e.g.:
      // await api.post("/host/services", fd, { headers: {"Content-Type":"multipart/form-data"}, onUploadProgress: (evt) => setProgress(Math.round((evt.loaded*100)/evt.total)) });
      await fakeUploadSimulation(setProgress);

      alert("Service saved successfully");
      if (typeof onSaved === "function") onSaved();
    } catch (err) {
      console.error(err);
      alert("Save failed — check console");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  // simulate upload (replace with real API call)
  function fakeUploadSimulation(setProgress) {
    return new Promise((resolve) => {
      let p = 0;
      const t = setInterval(() => {
        p += 12;
        setProgress(Math.min(p, 100));
        if (p >= 100) { clearInterval(t); resolve(); }
      }, 70);
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: GOLD }}>Host — Create Service</h2>
            <p className="text-sm text-gray-600">List packages, mark availability and set booking rules for travellers.</p>
          </div>
        </div>

        {/* core */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Service title (e.g. Sunrise Hike + Breakfast)" className="rounded-lg border border-gray-200 px-3 py-2" />
          <input value={shortDesc} onChange={e=>setShortDesc(e.target.value)} placeholder="Short tagline (one-liner)" className="rounded-lg border border-gray-200 px-3 py-2" />
        </div>

        <div className="mt-3">
          <textarea value={longDesc} onChange={e=>setLongDesc(e.target.value)} rows={4} className="w-full rounded-lg border border-gray-200 px-3 py-2" placeholder="Full description, inclusions, meeting point details..." />
        </div>

        {/* Packages */}
        {/* <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Packages</h3>
            <button type="button" onClick={addPackage} className="px-3 py-1 rounded bg-green-600 text-white text-sm cursor-pointer">+ Add package</button>
          </div>

          <div className="space-y-3">
            {packages.length === 0 && (
              <div className="text-sm text-gray-500">No packages yet — travellers usually prefer 1–3 options (economy / standard / premium).</div>
            )}

            {packages.map((pkg) => (
              <div key={pkg.id} className="border border-gray-300 rounded p-3 bg-gray-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input value={pkg.name} onChange={e=>updatePackage(pkg.id, { name: e.target.value })} placeholder="Package name (e.g. Standard)" className="rounded-lg border border-gray-200 px-3 py-2" />
                    <input value={pkg.price} onChange={e=>updatePackage(pkg.id, { price: e.target.value })} type="number" placeholder="Price (₹)" className="rounded-lg border border-gray-200 px-3 py-2" />
                    <input value={pkg.durationDays} onChange={e=>updatePackage(pkg.id, { durationDays: e.target.value })} type="number" placeholder="Duration (days)" className="rounded-lg border border-gray-200 px-3 py-2" />
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button type="button" onClick={() => removePackage(pkg.id)} className="text-sm text-red-500 cursor-pointer">Remove</button>
                    <div className="text-xs text-gray-500">Capacity</div>
                    <input value={pkg.capacity} onChange={e=>updatePackage(pkg.id, { capacity: e.target.value })} type="number" min={1} className="w-20 rounded-lg border border-gray-200 px-2 py-1" />
                  </div>
                </div>

                <div className="mt-2">
                  <textarea value={pkg.description} onChange={e=>updatePackage(pkg.id, { description: e.target.value })} className="w-full rounded border border-gray-200 px-3 py-2" placeholder="Package details, inclusions, meeting point, what to bring..." rows={2} />
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Availability */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Availability</h3>
            <button type="button" onClick={addAvailability} className="px-3 py-1 rounded bg-[#C59A2F] text-white text-sm cursor-pointer">+ Add range</button>
          </div>

          <div className="space-y-2">
            {availability.length === 0 && <div className="text-sm text-gray-500">Add date ranges when your service is available.</div>}

            {availability.map((r) => (
              <div key={r.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end bg-gray-50 p-3 rounded border border-gray-300">
                <div>
                  <label className="text-xs text-gray-600">Start</label>
                  <input type="date" value={r.start} onChange={e=>updateAvailability(r.id, { start: e.target.value })} className="rounded-lg border border-gray-200 px-2 py-1 w-full" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">End</label>
                  <input type="date" value={r.end} onChange={e=>updateAvailability(r.id, { end: e.target.value })} className="rounded-lg border border-gray-200 px-2 py-1 w-full" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Notes</label>
                  <input value={r.notes} onChange={e=>updateAvailability(r.id, { notes: e.target.value })} placeholder="e.g. weekends only" className="rounded-lg border border-gray-200 px-2 py-1 w-full" />
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="text-xs self-start text-gray-500">{validateDateRange(r) ? "Valid" : "Invalid dates"}</div>
                  <button type="button" onClick={() => removeAvailability(r.id)} className="px-3 py-1 rounded bg-red-100 text-red-600 cursor-pointer">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking rules */}
        <div className="mt-5 bg-gray-50 p-4 rounded border border-gray-300">
          <h3 className="text-lg font-semibold mb-2">Booking Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-600">Min booking days</label>
              <input type="number" min={1} value={bookingRules.minBookingDays} onChange={e=>setBookingRules(br=>({...br, minBookingDays: Number(e.target.value)}))} className="rounded border border-gray-300 px-2 py-1 w-full" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Max booking days</label>
              <input type="number" min={1} value={bookingRules.maxBookingDays} onChange={e=>setBookingRules(br=>({...br, maxBookingDays: Number(e.target.value)}))} className="rounded border border-gray-300 px-2 py-1 w-full" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Max guests / booking</label>
              <input type="number" min={1} value={bookingRules.maxGuestsPerBooking} onChange={e=>setBookingRules(br=>({...br, maxGuestsPerBooking: Number(e.target.value)}))} className="rounded border border-gray-300 px-2 py-1 w-full" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Buffer hours between bookings</label>
              <input type="number" min={0} value={bookingRules.bufferHours} onChange={e=>setBookingRules(br=>({...br, bufferHours: Number(e.target.value)}))} className="rounded border border-gray-300 px-2 py-1 w-full" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Advance notice (hours)</label>
              <input type="number" min={0} value={bookingRules.advanceNoticeHours} onChange={e=>setBookingRules(br=>({...br, advanceNoticeHours: Number(e.target.value)}))} className="rounded border border-gray-300 px-2 py-1 w-full" />
            </div>
            <div className="md:col-span-3">
              <label className="text-xs text-gray-600">Cancellation policy</label>
              <select value={bookingRules.cancellationPolicy} onChange={e=>setBookingRules(br=>({...br, cancellationPolicy: e.target.value}))} className="rounded border border-gray-300 px-2 py-1 w-full">
                <option>Flexible (refund until 24 hours before)</option>
                <option>Moderate (refund until 48 hours before)</option>
                <option>Strict (no refund)</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media dropzone */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Media (photos & videos)</label>
          <div {...getRootProps()} className={`mt-2 p-4 rounded border-dashed ${isDragActive ? "border-[#C59D5F] border" : "border-gray-200 border"} cursor-pointer bg-gray-50`}>
            <input {...getInputProps()} />
            <div className="text-sm text-gray-600">Drag & drop photos or videos here, or click to select.</div>
            <div className="text-xs text-gray-400 mt-1">Tip: add at least one hero image and a short video if possible.</div>
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {media.map((m, i) => (
              <div key={i} className="relative w-36 h-24 rounded overflow-hidden border border-gray-100">
                {m.type === "video" ? (
                  <video src={m.preview} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={m.preview} alt={m.file.name} className="w-full h-full object-cover" />
                )}
                <button type="button" onClick={() => removeMedia(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded px-1 text-xs">x</button>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">Upload: {progress}%</div>
          <button type="submit" disabled={!hasValidMinimal() || loading} style={{ background: hasValidMinimal() && !loading ? GOLD : "#E6E6E6" }} className={`px-5 py-2 rounded-lg font-medium ${hasValidMinimal() && !loading ? "text-white" : "text-gray-500"}`}>
            {loading ? "Saving..." : "Save Service"}
          </button>
        </div>
      </form>
    </div>
  );
}

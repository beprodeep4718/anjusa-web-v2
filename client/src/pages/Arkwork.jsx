import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axois";

const Arkwork = () => {
  const [artworks, setArtworks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [artworks, query, sort]);

  const fetchArtworks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/artwork");
      setArtworks(res.data || []);
    } catch (err) {
      console.error("Failed to load artworks:", err);
      setError("Failed to load artworks");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let list = [...artworks];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          (a.title || "").toLowerCase().includes(q) ||
          (a.description || "").toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === "price-desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(list);
  };

  return (
    <div className="flex flex-col h-full bg-base-200 min-h-screen">
      <div className="pt-12 px-12">
        <h1 className="text-3xl mb-4 mt-6 border-b-[1px] border-b-base-content py-4">
          Discover Original{" "}
          <span className="font-[playfair-display] italic text-2xl bg-base-content text-base-300 px-3">
            Art
          </span>{" "}
          by Talented{" "}
          <span className="font-[playfair-display] italic text-3xl bg-base-content text-base-300 px-3">
            Artists.
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-3 w-full md:w-2/3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artworks by title or description..."
              className="input input-bordered w-full"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select select-bordered"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="text-sm text-secondary">{artworks.length} artworks available</div>
        </div>

        {loading ? (
          <div className="py-20 text-center">Loading artworks...</div>
        ) : error ? (
          <div className="py-20 text-center text-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-secondary">No artworks found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {filtered.map((art) => (
              <div key={art._id} className="card bg-base-100 shadow">
                <figure className="h-56 overflow-hidden">
                  <img
                    src={art.image?.secureUrl || "/images/default-artwork.png"}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{art.title}</h2>
                  <p className="text-sm text-secondary line-clamp-2">{art.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="text-sm">Price: INR {art.price?.toFixed(2) ?? "N/A"}</div>
                      <div className="text-xs text-secondary">
                        {art.dimensions?.height ?? "—"} x {art.dimensions?.width ?? "—"} cm
                      </div>
                    </div>
                    <div>
                      <span
                        className={`badge ${
                          art.status === "approved"
                            ? "badge-success"
                            : art.status === "pending"
                            ? "badge-warning"
                            : art.status === "rejected"
                            ? "badge-error"
                            : "badge-ghost"
                        }`}
                      >
                        {art.status}
                      </span>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-3">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelected(art)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DaisyUI modal for artwork details */}
      <input
        type="checkbox"
        id="artwork-modal"
        className="modal-toggle"
        checked={!!selected}
        onChange={() => setSelected(null)}
      />
      <div className="modal">
        <div className="modal-box max-w-4xl">
          {selected ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <img
                    src={selected.image?.secureUrl || "/images/default-artwork.png"}
                    alt={selected.title}
                    className="w-full h-80 object-cover rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold">{selected.title}</h3>
                  <p className="text-sm text-secondary mt-2">{selected.description}</p>
                  <div className="mt-4">
                    <div className="text-sm">Price: INR {selected.price?.toFixed(2) ?? "N/A"}</div>
                    <div className="text-sm text-secondary">
                      Dimensions: {selected.dimensions?.height ?? "—"} x{" "}
                      {selected.dimensions?.width ?? "—"} cm
                    </div>
                    <div className="mt-2">
                      <span className="badge badge-ghost">{selected.status}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      className={`btn btn-primary ${selected.status !== "approved" ? "btn-disabled" : ""}`}
                      disabled={selected.status !== "approved"}
                    >
                      Buy
                    </button>
                    <button className="btn" onClick={() => setSelected(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arkwork;
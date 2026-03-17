import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBand, updateBand } from "../../services/bandService";
import { getArtists, getArtist, updateArtist } from "../../services/artistService";
import { getBandRoles } from "../../services/bandRoleService";

export default function AddMember() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [band, setBand] = useState(null);
    const [artists, setArtists] = useState([]);
    const [bandRoles, setBandRoles] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedArtistId, setSelectedArtistId] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const [bandData, artistsData, rolesData] = await Promise.all([
                    getBand(slug),
                    getArtists(),
                    getBandRoles(),
                ]);
                setBand(bandData);
                setArtists(artistsData);
                setBandRoles(rolesData);
            } catch (err) {
                console.error(err);
                setError("Failed to load data.");
            }
        }
        fetchData();
    }, [slug]);

    const filteredArtists = artists.filter((a) =>
        a.displayName.toLowerCase().includes(search.toLowerCase())
    );

    async function handleSubmit(e) {
        e.preventDefault();
        if (!selectedArtistId) {
            setError("Please select an artist.");
            return;
        }
        if (!band) return;

        setError("");
        setSubmitting(true);

        try {
            const artist = await getArtist(selectedArtistId);

            // Add artist to band if not already a member
            if (!band.artistGuids.includes(artist.id)) {
                const updatedBand = {
                    ...band,
                    artistGuids: [...band.artistGuids, artist.id],
                };
                await updateBand(band.id, updatedBand);
            }

            // Add band to artist's bandGuids if not already there
            if (!artist.bandGuids.includes(band.id)) {
                const updatedArtist = {
                    ...artist,
                    bandGuids: [...artist.bandGuids, band.id],
                };
                await updateArtist(artist.id, updatedArtist);
            }

            navigate(`/bands/${slug}`);
        } catch (err) {
            setError(err.message ?? "Failed to add member. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <header className="panel text-center">
                <h1>Add Member{band ? ` — ${band.displayName}` : ""}</h1>
            </header>
            <section className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Search artists..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setSelectedArtistId("");
                        }}
                    />
                    <br />
                    <select
                        className="input input-select"
                        value={selectedArtistId}
                        onChange={(e) => setSelectedArtistId(e.target.value)}
                        required
                    >
                        <option value="">Select Artist...</option>
                        {filteredArtists.map((artist) => (
                            <option key={artist.id} value={artist.id}>
                                {artist.displayName}
                            </option>
                        ))}
                    </select>
                    <br />
                    {bandRoles.length > 0 && (
                        <>
                            <select
                                className="input input-select"
                                value={selectedRoleId}
                                onChange={(e) => setSelectedRoleId(e.target.value)}
                            >
                                <option value="">Select Role (optional)...</option>
                                {bandRoles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.displayName}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </>
                    )}
                    {error && <p className="subtitle">{error}</p>}
                    <button className="btn" type="submit" disabled={submitting || !selectedArtistId}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg>
                        <span>{submitting ? "Adding..." : "Add Member"}</span>
                    </button>
                </form>
            </section>
        </>
    );
}

export interface ProfilApi
{
    id: number;
    fnavn: string;
    lnavn: string;
    email: string;
    mobil: number;
}

const BASE_URL = "http://localhost:5233/api/profil";

export async function getProfil(id: number): Promise<ProfilApi>{
    const res = await fetch (`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Kunne ikke hente profil");
    return res.json();
}

export async function createProfil(profil: Omit<ProfilApi, "id">): Promise<ProfilApi>{
    const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(profil)
    });
    if (!res.ok) throw new Error("Kunne ikke oprette profil");
    return res.json();
}


export async function updateProfil(id: number, profil: any): Promise<any> {
    const url = `${BASE_URL}/${id}`;
    console.log("PUT ->", url);
    console.log("Payload ->", profil);

    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profil),
    });

    const text = await res.text();
    let parsed: any;
    try { parsed = JSON.parse(text); } catch { parsed = text; }

    console.log("Response status:", res.status);
    console.log("Response body:", parsed);

    if (!res.ok) {
        throw new Error(`Kunne ikke opdatere profil. Status ${res.status}. Body: ${typeof parsed === "string" ? parsed : JSON.stringify(parsed)}`);
    }

    return parsed;
}


export async function deleteProfil(id: number): Promise<void>{
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Kunne ikke slette profil");
}


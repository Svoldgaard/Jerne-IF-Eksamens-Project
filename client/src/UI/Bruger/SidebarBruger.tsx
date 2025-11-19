
function SidebarBruger(){

    return (
        <div>
            <button className="button" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
        </div>
    )
}

export default SidebarBruger;
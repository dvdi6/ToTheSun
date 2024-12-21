import "./SearchBtn.css"

export default function SearchBtn({startSearching, children}) {

    return (
        <>
            <button className="search-button" aria-label="Click to start searching for destinations" onClick={startSearching}>{children}</button>
        </>

    )

}
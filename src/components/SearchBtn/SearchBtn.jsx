import "./SearchBtn.css"

export default function SearchBtn({startSearching, children}) {

    return (
        <>
            <button className="search-button" onClick={startSearching}>{children}</button>
        </>

    )

}
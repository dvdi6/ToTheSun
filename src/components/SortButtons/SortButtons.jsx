import "./SortButtons.css"

export default function SortButtons({ onSortByName, onSortByScore, isSortedByNameAsc, isSortedByScoreAsc }) {
    return (
        <div className="sort-buttons">
            <button onClick={onSortByName} className="sort-button">
                Sort by Name {isSortedByNameAsc ? 'A-Z' : 'Z-A'}
            </button>
            <button onClick={onSortByScore} className="sort-button">
                Sort by Score {isSortedByScoreAsc ? 'Low-High' : 'High-Low'}
            </button>
        </div>
    )
}
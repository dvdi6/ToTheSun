import "./SortButtons.css"

export default function SortButtons({ onSortByName, onSortByScore, isSortedByNameAsc, isSortedByScoreAsc }) {
    return (
        <div className="sort-buttons">
            <button onClick={onSortByName} className="sort-button">
                Sort {isSortedByNameAsc ? 'A-Z' : 'Z-A'}
            </button>
            <button onClick={onSortByScore} className="sort-button">
                Sort {isSortedByScoreAsc ? 'Low-High' : 'High-Low'}
            </button>
        </div>
    )
}
import "./SortButtons.css"

export default function SortButtons({ onSortByName, onSortByScore, isSortedByNameAsc, isSortedByScoreAsc }) {
    return (
        <div className="sort-buttons">
            <button onClick={onSortByName} className="sort-button">
                Sort {isSortedByNameAsc ? 'Z-A' : 'A-Z'}
            </button>
            <button onClick={onSortByScore} className="sort-button">
                Sort {isSortedByScoreAsc ? 'High-Low' : 'Low-High'}
            </button>
        </div>
    )
}
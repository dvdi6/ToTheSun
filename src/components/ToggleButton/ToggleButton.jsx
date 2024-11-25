import "./ToggleButton.css"

export default function ToggleButton({onClick, children }) {
    return (
        <button className="toggle-button" onClick={onClick}>
            {children}
        </button>
    );
}
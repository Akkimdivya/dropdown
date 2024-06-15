import React, { useState, useEffect } from "react";
import { Info, UserCircle } from "phosphor-react";
import "./Dropdown.css";

const Dropdown = ({
  label,
  labelVisibility,
  status,
  labelIconVisibility,
  leftIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items,
  onItemSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(activeItemIndex);
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    setSelectedIndex(activeItemIndex);
  }, [activeItemIndex]);

  const toggleDropdown = () => {
    if (status !== "Disabled") {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (index) => {
    if (type === "Multi") {
      const newSelectedIndices = selectedIndices.includes(index)
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index];
      setSelectedIndices(newSelectedIndices);
      onItemSelected(newSelectedIndices);
    } else {
      setSelectedIndex(index);
      setIsOpen(false);
      onItemSelected(index);
    }
  };

  const renderIcon = (iconVisibility, IconComponent, color) => {
    return iconVisibility === "Visible" ? (
      <IconComponent size={24} color={color} className="" />
    ) : null;
  };

  return (
    <div className="dropdown-container">
      {/* Label */}
      {labelVisibility === "Visible" && (
        <label className="dropdown-label">
          <div>{label}</div>
          <div>{renderIcon(labelIconVisibility, Info)}</div>
          <div>
            {required === "Yes" && (
              <span className="required-indicator">*</span>
            )}
          </div>
        </label>
      )}

      {/* Select */}
      <div
        className={`dropdown-select ${status.toLowerCase()}`}
        onClick={toggleDropdown}
      >
        {renderIcon(leftIconVisibility, UserCircle, "#747475")}
        <div className="dropdown-text">
          {(() => {
            const textToDisplay =
              type === "Multi"
                ? selectedIndices.length > 0
                  ? selectedIndices.map((index) => items[index]).join(", ")
                  : text
                : selectedIndex >= 0
                  ? items[selectedIndex]
                  : text;

            return textToDisplay.length > 22
              ? textToDisplay.substring(0, 22) + "..."
              : textToDisplay;
          })()}
        </div>
        <svg
          className="dropdown-arrow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="dropdown-options">
          {items.map((item, index) => (
            <li
              key={index}
              className={`dropdown-option ${(type === "Multi" && selectedIndices.includes(index)) || (type !== "Multi" && index === selectedIndex) ? "selected" : ""}`}
              onClick={() => handleSelect(index)}
            >
              <div className="option-content">
                {type === "SingleRadio" && (
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      name="single-select"
                      className="hidden-radio"
                      checked={index === selectedIndex}
                      onChange={() => handleSelect(index)}
                    />
                    <div
                      className={`radio-icon ${index === selectedIndex ? "checked" : ""}`}
                    >
                      {index === selectedIndex && (
                        <div className="radio-inner-icon"></div>
                      )}
                    </div>
                  </div>
                )}
                {type === "Multi" && (
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="hidden-checkbox"
                      checked={selectedIndices.includes(index)}
                      onChange={() => handleSelect(index)}
                    />
                    <div
                      className={`checkbox-icon ${selectedIndices.includes(index) ? "checked" : ""}`}
                    >
                      {selectedIndices.includes(index) && (
                        <svg
                          className="checkbox-check-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                <div className="option-text">{item}</div>
                {type === "SingleNoIcon" && index === selectedIndex ? (
                  <span className="option-check">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#47b647"
                      viewBox="0 0 256 256"
                    >
                      <path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"></path>
                    </svg>
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Helper Text */}
      {helperText && <div className="dropdown-helper">{helperText}</div>}
    </div>
  );
};

export default Dropdown;

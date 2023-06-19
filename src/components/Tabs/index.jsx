import "./tabs.scss"
import React, { useState } from "react"

function Tabs({ onTabClick }) {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]

    function getCurrentDay() {
        const date = new Date()
        const dayWeek = date.getDay()
        return dayWeek - 1
    }

    const [activeTab, setActiveTab] = useState(getCurrentDay())

    function handleTabClick(day, index) {
        if (index !== activeTab) {
            setActiveTab(index)
            onTabClick(day)
        }
    }

    return (
        <div className="tabs-container">
            {days.map((day, index) => (
                <div
                    key={index}
                    onClick={() => handleTabClick(day, index)}
                    className={`tab ${index === activeTab ? "active" : ""
                        } ${day.toLowerCase()}`}
                >
                    {day}
                </div>
            ))}
        </div>
    );

}

export default Tabs;
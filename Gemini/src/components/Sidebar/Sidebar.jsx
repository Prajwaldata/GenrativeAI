import React, { useContext, useState } from "react";
import "./Sidebar.css"; // Make sure this path is correct
import { assets } from "../../assets/assets.js"; // Make sure this path is correct
import { Context } from "../../Context/Context.jsx"; // Make sure this path is correct

const Sidebar = () => {
  // State to control if the sidebar is expanded or collapsed
  const [extended, setExtended] = useState(false);

  const { onSent, prevPrompt,newChat } = useContext(Context);

  // Function to handle clicking on a previous prompt in the sidebar
  const loadPromt = async (prompt) => {
    // Call the main onSent function, passing the selected prompt
    // and 'true' to indicate this is a reload, not a new submission.
    await onSent(prompt, true);
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* Menu Icon to toggle sidebar extension */}
        <img
          src={assets.menu_icon}
          onClick={() => setExtended((prev) => !prev)} // Toggle state on click
          className="menu"
          id="menu-img"
          alt="Menu Icon"
        />
        {/* "New Chat" button/section */}
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="New Chat Icon" />
          {/* Conditionally render text based on 'extended' state */}
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* "Recent" prompts section - only shown if sidebar is extended */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {/* Map over the history of previous prompts */}
            {prevPrompt.map((item, index) => {
              return (
                // Use index as key (ensure prompts are stable or use unique IDs if available)
                <div
                  key={index}
                  onClick={() => loadPromt(item)} // Call loadPromt with the specific prompt string
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  {/* Display truncated prompt text */}
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Bottom section with Help, Activity, Settings */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {/* Conditionally render text based on 'extended' state */}
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";
const Main = () => {
    const{onSent, recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)



  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
      {!showResult
          ?
          <>
          <div className="greet">
          
          <p>
            <span>Hello Dev.</span>
          </p>
          <p>How can i help you Today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest the Beautiful Places to Visit this Weekend in pune</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Suggest few Good Spots in Pune for Dinner</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Suggest How will I get the Job in 2026</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>What are the current Most Popular Programming Languages?</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
          </>
          :
            <div className='result'>
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading?
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>:
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                
              </div>
            </div>
          }
        
        <div className="main-bottom">
          <div className="search-box">
            <input type="text" onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter a Prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              
              {input?<img src={assets.send_icon} onClick={()=>{onSent(input); console.log(input)} } alt="send" />
              : null}
              
            </div>
          </div>
          {!showResult ?
          <p className="bottom-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            voluptatem ut ad, error delectus tempora quas veritatis maxime
            corporis ducimus.
          </p>
          : null}
        </div>
      </div>
    </div>
  );
};
export default Main;

import { createContext, useState } from "react";
import run from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt, isReload = false) => {
        if (!prompt || !prompt.trim()) {
            return;
        }

        setLoading(true);
        setShowResult(true);
        setResultData("");
        setRecentPrompt(prompt);

        if (!isReload) {
            setPrevPrompt((prev) => [...prev, prompt]);
        }

        setInput("");

        try {
            const response = await run(prompt);
            const rawText = response?.text;

            if (!rawText) {
                console.error("Received empty or invalid response text from API.");
                setResultData("Error: No response content received.");
                return;
            }

            let parts = rawText.split('**');
            let formattedHtml = '';
            for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 0) {
                    formattedHtml += parts[i];
                } else {
                    if (parts[i]) {
                        formattedHtml += `<b>${parts[i]}</b>`;
                    }
                }
            }
            formattedHtml = formattedHtml.split('*').join('<br/>');
            formattedHtml = formattedHtml.replace(/\n/g, '<br/>');
            formattedHtml = formattedHtml.replace(/(<br\s*\/?>\s*){2,}/gi, '<br/>');
            setResultData(formattedHtml);
        } catch (error) {
            console.error("Error during onSent execution:", error);
            setResultData(`An error occurred while fetching the response. Please try again. (${error.message})`);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
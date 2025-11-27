import { createContext, useState } from "react";
import { runChat } from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextChar) => {
    setTimeout(() => {
      setResultData(prev => prev + nextChar);
    }, 10 * index);
  };

  const newChat = () => {
    setShowResults(false);
    setResultData("");
  };

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResults(true);
    setResultData("");

    let finalPrompt = prompt ?? input;

    // store history
    setRecentPrompt(prompt); // keep last prompt if you want
// ❌ don't push into prevPrompts anymore


    try {
      const response = await runChat(finalPrompt);

      // Formatting response (bold + line breaks)
      let formatted = response
        .split("**")
        .map((text, i) => (i % 2 === 1 ? `<b>${text}</b>` : text))
        .join("")
        .replace(/\n/g, "<br/>");

      // Animate text
      [...formatted].forEach((char, i) => delayPara(i, char));

    } catch (err) {
      console.error(err);
      setResultData("⚠️ Something went wrong.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        showResults,
        loading,
        resultData,
        prevPrompts,
        recentPrompt,
        onSent,
        setRecentPrompt,
        setPrevPrompts,
        newChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Verify() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const valid = digits.every((d) => d.length === 1);

  const handleKeyPress = (val: string) => {
    if (val === "backspace") {
      // Find last filled index and clear it
      const next = [...digits];
      for (let i = 3; i >= 0; i--) {
        if (next[i] !== "") {
          next[i] = "";
          setDigits(next);
          break;
        }
      }
    } else if (val === "+*#") {
      // Ignore
    } else {
      // Find first empty index and set it
      const next = [...digits];
      for (let i = 0; i < 4; i++) {
        if (next[i] === "") {
          next[i] = val;
          setDigits(next);
          break;
        }
      }
    }
  };

  const submit = () => {
    if (!valid) return;
    navigate("/location");
  };

  const KEYBOARD_KEYS = [
    { num: "1", letters: "" },
    { num: "2", letters: "ABC" },
    { num: "3", letters: "DEF" },
    { num: "4", letters: "GHI" },
    { num: "5", letters: "JKL" },
    { num: "6", letters: "MNO" },
    { num: "7", letters: "PQRS" },
    { num: "8", letters: "TUV" },
    { num: "9", letters: "WXYZ" },
    { num: "+ * #", letters: "" },
    { num: "0", letters: "" },
    { num: "backspace", letters: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen justify-between bg-white select-none">
      {/* Top Content */}
      <div className="px-6 pt-12 flex-1 flex flex-col">
        <Link to="/number" aria-label="Back" className="text-3xl text-neutral-800 hover:text-primary transition-colors inline-block w-8">
          ‹
        </Link>
        
        <h1 className="mt-8 text-2xl font-bold text-neutral-900 leading-tight">
          Enter your 4-digit code
        </h1>

        <label className="mt-8 block text-xs font-bold text-brand-gray uppercase tracking-wider">
          Code
        </label>
        
        <div className="mt-4 flex gap-6 border-b border-neutral-300 pb-3">
          {digits.map((d, i) => (
            <div
              key={i}
              className="w-8 text-center text-2xl font-bold text-neutral-900 min-h-[36px]"
            >
              {d || <span className="text-neutral-300">-</span>}
            </div>
          ))}
        </div>

        {/* Resend & Arrow Action Bar above keyboard */}
        <div className="mt-auto flex items-center justify-between pb-6">
          <button
            className="text-sm font-semibold text-primary hover:underline cursor-pointer"
            onClick={() => setDigits(["", "", "", ""])}
          >
            Resend Code
          </button>
          
          <button
            onClick={submit}
            disabled={!valid}
            aria-label="Continue"
            className="grid h-16 w-16 place-items-center rounded-full bg-primary text-2xl text-white shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Visual Keyboard Section */}
      <div className="bg-neutral-100/70 border-t border-neutral-200/50 p-2 pb-6 grid grid-cols-3 gap-x-2 gap-y-2">
        {KEYBOARD_KEYS.map((key, index) => {
          if (key.num === "backspace") {
            return (
              <button
                key={index}
                onClick={() => handleKeyPress("backspace")}
                className="flex flex-col items-center justify-center h-14 rounded-lg bg-white active:bg-neutral-200 shadow-2xs text-neutral-700 cursor-pointer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                  <line x1="18" y1="9" x2="12" y2="15"/>
                  <line x1="12" y1="9" x2="18" y2="15"/>
                </svg>
              </button>
            );
          }
          
          return (
            <button
              key={index}
              onClick={() => handleKeyPress(key.num === "+ * #" ? "+*#" : key.num)}
              className="flex flex-col items-center justify-center h-14 rounded-lg bg-white active:bg-neutral-200 shadow-2xs cursor-pointer"
            >
              <span className="text-xl font-semibold text-neutral-900 leading-none">{key.num}</span>
              {key.letters && (
                <span className="text-[9px] font-bold text-neutral-400 tracking-wider mt-0.5 uppercase">{key.letters}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default Verify;

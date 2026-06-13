import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthShell } from "@/components/AuthShell";
import { useAuthStore } from "@/lib/store/auth";

export function NumberPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [phone, setPhone] = useState("");
  const valid = phone.replace(/\D/g, "").length >= 8;

  const handleKeyPress = (val: string) => {
    if (val === "backspace") {
      setPhone((prev) => prev.slice(0, -1));
    } else if (val === "+*#") {
      // Do nothing for symbols
    } else {
      if (phone.length < 11) {
        setPhone((prev) => prev + val);
      }
    }
  };

  const submit = () => {
    if (!valid) return;
    const fullPhone = `+880 ${phone}`;
    signIn({ phone: fullPhone });
    updateUser({ phone: fullPhone });
    navigate("/verify");
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
      {/* Top Section */}
      <div className="px-6 pt-12 flex-1 flex flex-col">
        <Link to="/signin" aria-label="Back" className="text-3xl text-neutral-800 hover:text-primary transition-colors inline-block w-8">
          ‹
        </Link>
        
        <h1 className="mt-8 text-2xl font-bold text-neutral-900 leading-tight">
          Enter your mobile number
        </h1>

        <label className="mt-8 block text-xs font-bold text-brand-gray uppercase tracking-wider">
          Mobile Number
        </label>
        
        <div className="flex items-center gap-3 border-b border-neutral-300 py-3 mt-1">
          <span aria-hidden className="text-2xl">🇧🇩</span>
          <span className="text-base font-semibold text-neutral-800">+880</span>
          <input
            readOnly
            value={phone}
            placeholder="1XXX-XXXXXX"
            className="flex-1 bg-transparent text-lg font-bold text-neutral-900 outline-hidden"
          />
        </div>

        {/* Next Arrow Button above keyboard */}
        <div className="mt-auto flex justify-end pb-6">
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
export default NumberPage;

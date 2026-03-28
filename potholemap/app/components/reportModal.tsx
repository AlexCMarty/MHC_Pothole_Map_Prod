'use client';
import { useState } from 'react';

export default function ReportModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute bottom-6 right-6 z-[400] bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-xl transition-transform active:scale-95 flex items-center justify-center font-bold text-lg"
      >
        🚨 Report
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="absolute inset-0 z-[500] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-4">
            {/* This div has been customized by Krystian Gawecki */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Report a Pothole</h2>
              <button
                type="button"
                className="rounded-lg bg-red-600 hover:bg-red-700 text-xl font-bold w-10 h-10"
                onClick={() => setIsOpen(false)}
              > X 
              </button>
            </div>
            <p className="text-sm text-slate-600">Pinpoint the hazard to warn others.</p>
            
            <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
              <div className="flex flex-col">
                <p
                  className="text-slate-800"
                > Location <span className="text-red-600"> * </span>
                </p>
                <input 
                  type="text" 
                  placeholder="Location Description (e.g. Right lane on 5th Ave)" 
                  className="w-full border border-slate-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-red-500 outline-none -mt-0.5"
                  required
                />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-slate-800"
                > Severity <span className="text-red-600"> * </span>
                </p>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-3 text-black outline-none"
                  defaultValue="" // sets the initial value
                  required
                >
                  <option value="" disabled>
                    --Select an option--
                  </option>
                  <option value="minor">Minor (Bumpy)</option>
                  <option value="moderate">Moderate (Might pop a tire)</option>
                  <option value="severe">Severe (Crater)</option>
                </select>
              </div>
              <div className="flex flex-col">
                <p
                  className="text-slate-800"
                > Image(s)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full border border-slate-300 rounded-lg p-3 text-black outline-none"
                ></input>
              </div>
              
              <div className="flex gap-3 mt-2">
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
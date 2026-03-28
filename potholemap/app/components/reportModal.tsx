'use client';
import { useState } from 'react';

export default function ReportModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  };

  // Remove a file by index
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Display file names
  const fileNames = selectedFiles.length === 0
    ? "No files selected"
    : `${selectedFiles.length} file(s) selected`;

  // Close modal and reset files
  const handleClose = () => {
    setIsOpen(false);
    setSelectedFiles([]);
  };

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
            
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Report a Pothole</h2>
              <button
                type="button"
                className="rounded-lg bg-red-600 hover:bg-red-700 text-xl font-bold w-10 h-10"
                onClick={handleClose}
              >
                X
              </button>
            </div>

            <p className="text-sm text-slate-600">Pinpoint the hazard to warn others.</p>

            {/* Form */}
            <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
              
              {/* Location */}
              <div className="flex flex-col">
                <p className="text-slate-800">
                  Location<span className="text-red-600">*</span>
                </p>
                <input 
                  type="text"
                  placeholder="Location Address"
                  className="w-full border border-slate-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-red-500 outline-none -mt-0.5"
                  required
                />
              </div>

              {/* Severity */}
              <div className="flex flex-col">
                <p className="text-slate-800">Severity</p>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-3 text-black outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>--Select an option--</option>
                  <option value="minor">Minor (Bumpy)</option>
                  <option value="moderate">Moderate (Might pop a tire)</option>
                  <option value="severe">Severe (Crater)</option>
                </select>
              </div>

              {/* Image upload */}
              <div className="flex flex-col">
                <p className="text-slate-800">Image(s)</p>
                
                {/* File input label */}
                <label className="w-full border border-slate-300 rounded-lg p-3 text-black flex justify-between items-center cursor-pointer">
                  {fileNames}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {/* Image previews with remove button */}
                {selectedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFiles.map((file, idx) => {
                      const url = URL.createObjectURL(file);
                      return (
                        <div key={idx} className="relative w-16 h-16">
                          <img
                            src={url}
                            alt={file.name}
                            className="w-16 h-16 object-cover rounded-md border"
                            onLoad={() => URL.revokeObjectURL(url)}
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-700"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit button */}
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
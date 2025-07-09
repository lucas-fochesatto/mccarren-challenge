export default function EditableField({ label, value, onChange, isEditing, isTextArea = false, name }) {
    const commonClasses = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";
    
    return (
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
        {isEditing ? (
          isTextArea ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              className={`${commonClasses} min-h-[100px] resize-y bg-white`}
              rows="4"
            />
          ) : (
            <input
              type="text"
              name={name}
              value={value}
              onChange={onChange}
              className={`${commonClasses} bg-white`}
            />
          )
        ) : (
          <p className={`${commonClasses} bg-gray-50 text-gray-800 min-h-[42px]`}>{value || "-"}</p>
        )}
      </div>
    );
  };